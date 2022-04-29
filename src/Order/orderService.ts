import { ObjectID } from 'bson'
import _ from 'lodash'
import * as R from 'ramda'
import { delay, inject, injectable } from 'tsyringe'
import { CustomValuesDTO, DocumentCustomValues, Models, Types } from '~/base'
import { CustomerService } from '~/Customer'
import {
  CustomFieldDTO,
  CustomFieldService,
  DocumentCustomField,
} from '~/CustomField'
import {
  OrderStateMachine,
  OrderTransition,
} from '~/libraries/OrderStateMachine'
import {
  createOrderDTO,
  DocumentOrder,
  OrderDTO,
  OrderRepository,
} from '~/Order'
import { DocumentProduct, ProductService } from '~/Product'
import { StoreService } from '~/Store'

@injectable()
export class OrderService {
  constructor(
    @inject(delay(() => OrderRepository))
    private readonly orderRepository: OrderRepository,
    @inject(delay(() => OrderStateMachine))
    private readonly orderStateMachine: OrderStateMachine,
    @inject(delay(() => StoreService))
    private readonly storeService: StoreService,
    @inject(delay(() => CustomerService))
    private readonly customerService: CustomerService,
    private readonly productService: ProductService,
    @inject(delay(() => CustomFieldService))
    private readonly customFieldService: CustomFieldService
  ) {}

  async getAllOrders() {
    const orders = await this.orderRepository.find()

    return await this.getOrderDTOs(orders)
  }

  async getOrderById(id: string) {
    const order = await this.orderRepository.findOne(id)

    if (!order) {
      throw new Error('correspond order not found')
    }

    return (await this.getOrderDTOs([order]))[0]
  }
  async getOrderDTOs(orders: DocumentOrder[]) {
    const customerIds = R.map((order: DocumentOrder) => order.customer, orders)

    const customerDTOs = await this.customerService.getCustomersByIds(
      customerIds
    )

    const orderDTOs = await Promise.all(
      R.map(async (order: DocumentOrder) => {
        const customFieldIds = R.map(
          (customValue: DocumentCustomValues) => customValue.customField,
          order.customValues
        )
        let customValuesDTOs = R.map((customValue: DocumentCustomValues) => {
          return new CustomValuesDTO(customValue)
        }, order.customValues)
        const customFields = await this.customFieldService.getCustomFieldsByIds(
          Models.Order,
          customFieldIds
        )

        const extendedCustomValuesDTO = _.compact(
          R.map((customValuesDTO: CustomValuesDTO) => {
            const customField = _.find(customFields, (x) =>
              (customValuesDTO.customField as ObjectID).equals(x._id)
            )
            if (!customField) {
              return null
            }
            customValuesDTO.customField = new CustomFieldDTO(customField)
            return customValuesDTO
          }, customValuesDTOs)
        )

        const orderDTO = new OrderDTO(order, extendedCustomValuesDTO)
        orderDTO.products = await this.productService.getProductDTOs(
          await this.productService.getProductsByIds(
            orderDTO.products as string[]
          )
        )
        return orderDTO
      }, orders)
    )

    return _.compact(
      R.map((orderDTO: OrderDTO) => {
        const customer = _.find(customerDTOs, (x) =>
          (orderDTO.customer as ObjectID).equals(x._id)
        )
        if (!customer) {
          return null
        }
        orderDTO.customer = customer
        return orderDTO
      }, orderDTOs)
    )
  }
  async getOrdersByStoreId(storeId: string) {
    const orders = await this.orderRepository.find({
      store: storeId,
    })

    return await this.getOrderDTOs(orders)
  }
  async createNewOrder(payload: createOrderDTO) {
    let price = 0
    const store = await this.storeService.getStoreById(payload.store)

    if (!store) {
      throw new Error('correspond store not found')
    }

    const customer = await this.customerService.getCustomerById(
      payload.customer
    )

    if (!customer) {
      throw new Error('correspond customer not found')
    }

    const products = await this.productService.getProductsByIds(
      payload.products
    )

    if (products.length !== payload.products.length) {
      throw new Error('correspond product not found')
    }

    const inputCustomFieldIds = _.uniq(
      R.map(
        (customValue: DocumentCustomValues) => customValue.customField,
        payload.customValues ?? []
      )
    )

    const customFields = await this.customFieldService.getCustomFieldsByModel(
      payload.store,
      Models.Order
    )
    const requiredCustomFields = _.filter(customFields, (x) => x.required)

    if (
      _.filter(
        inputCustomFieldIds,
        (x) => _.findIndex(customFields, (y) => y._id.equals(x)) === -1
      ).length
    ) {
      throw new Error('Correspond CustomField Not Found')
    }
    if (
      _.filter(
        requiredCustomFields,
        (x) => _.findIndex(inputCustomFieldIds, (y) => x._id.equals(y)) === -1
      ).length
    ) {
      throw new Error('required custom Field not entered')
    }

    R.map(async (customValue: DocumentCustomValues) => {
      const type = customFields.find((x: DocumentCustomField) =>
        x._id.equals(customValue.customField)
      )!.type

      if (
        !(
          (type === Types.Date &&
            typeof customValue.value === 'object' &&
            customValue.value instanceof Date) ||
          type === typeof customValue.value
        )
      ) {
        throw new Error('custom Field type not matched')
      }
    }, payload.customValues ?? [])

    R.map((product: DocumentProduct) => (price += product.price), products)

    return (
      await this.getOrderDTOs([
        await this.orderRepository.create({ ...payload, price }),
      ])
    )?.[0]
  }
  async changeStatus(id: string, transition: OrderTransition) {
    const order = await this.orderRepository.findOne(id)

    return order
      ? (
          await this.getOrderDTOs([
            await this.orderStateMachine.changeState({ order, transition }),
          ])
        )?.[0]
      : order
  }
}
