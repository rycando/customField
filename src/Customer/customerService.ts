import { ObjectID } from 'bson'
import _ from 'lodash'
import { Schema } from 'mongoose'
import * as R from 'ramda'
import { delay, inject, injectable } from 'tsyringe'
import { CustomValuesDTO, DocumentCustomValues, Models, Types } from '~/base'
import {
  createCustomerDTO,
  CustomerDTO,
  CustomerRepository,
  DocumentCustomer,
} from '~/Customer'
import { CustomFieldDTO, CustomFieldService } from '~/CustomField'
import { StoreService } from '~/Store'

@injectable()
export class CustomerService {
  constructor(
    @inject(delay(() => CustomerRepository))
    private readonly customerRepository: CustomerRepository,
    private readonly storeService: StoreService,
    private readonly customFieldService: CustomFieldService
  ) {}

  getAllCustomers = async () => {
    return await this.getCustomerDTOs(await this.customerRepository.find())
  }
  async getCustomerById(id: string) {
    const customer = await this.customerRepository.findOne(id)
    if (!customer) {
      throw new Error('correspond Customer not found')
    }
    return (await this.getCustomerDTOs([customer]))[0]
  }
  async getCustomersByIds(ids: string[] | Schema.Types.ObjectId[]) {
    return await this.getCustomerDTOs(
      await this.customerRepository.find({
        _id: { $in: ids },
      })
    )
  }
  async getCustomerDTOs(customers: DocumentCustomer[]) {
    return await Promise.all(
      R.map(async (customer: DocumentCustomer) => {
        const customFieldIds = R.map(
          (customValue: DocumentCustomValues) => customValue.customField,
          customer.customValues
        )
        let customValuesDTOs = R.map((customValue: DocumentCustomValues) => {
          return new CustomValuesDTO(customValue)
        }, customer.customValues)
        const customFields = await this.customFieldService.getCustomFieldsByIds(
          Models.Customer,
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

        return new CustomerDTO(customer, extendedCustomValuesDTO)
      }, customers)
    )
  }
  async getCustomersByStoreId(storeId: string) {
    const customers = await this.customerRepository.find({
      store: storeId,
    })

    return await this.getCustomerDTOs(customers)
  }
  async createNewCustomer(payload: createCustomerDTO) {
    const store = await this.storeService.getStoreById(payload.store)

    if (!store) {
      throw new Error('correspond store not found')
    }

    const inputCustomFieldIds = _.uniq(
      R.map(
        (customValue: DocumentCustomValues) => customValue.customField,
        payload.customValues ?? []
      )
    )

    const customFields = await this.customFieldService.getCustomFieldsByModel(
      payload.store,
      Models.Customer
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
    R.map((customValue: DocumentCustomValues) => {
      const type = customFields.find((x) =>
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

    const alreadyExistingCustomer = await this.customerRepository.find({
      email: payload.email,
      store: payload.store,
    })

    if (alreadyExistingCustomer.length) {
      throw new Error('already existing Customer')
    }

    return (
      (
        await this.getCustomerDTOs([
          await this.customerRepository.create(payload),
        ])
      )?.[0] ?? undefined
    )
  }

  /**
   * customField에 해당하는 모든 customValues를 삭제합니다
   * @param storeId
   * @param customFieldId
   * @returns
   */
  async deleteCustomValues(
    storeId: string | Schema.Types.ObjectId,
    customFieldId: string
  ) {
    return await this.customerRepository.removeCustomField(
      storeId,
      customFieldId
    )
  }
}
