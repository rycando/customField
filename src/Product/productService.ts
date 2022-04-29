import { ObjectID } from 'bson'
import _ from 'lodash'
import { Schema } from 'mongoose'
import * as R from 'ramda'
import { delay, inject, injectable } from 'tsyringe'
import { CustomValuesDTO, DocumentCustomValues, Models, Types } from '~/base'
import { CustomFieldDTO, CustomFieldService } from '~/CustomField'
import {
  createProductDTO,
  DocumentProduct,
  ProductDTO,
  ProductRepository,
} from '~/Product'
import { StoreService } from '~/Store'
import { isDate } from '~/tools/utils'

@injectable()
export class ProductService {
  constructor(
    @inject(delay(() => ProductRepository))
    private readonly productRepository: ProductRepository,
    @inject(delay(() => StoreService))
    private readonly storeService: StoreService,
    @inject(delay(() => CustomFieldService))
    private readonly customFieldService: CustomFieldService
  ) {}

  getAllProducts = async () => {
    return await this.productRepository.find()
  }
  async getProductById(id: string) {
    return await this.productRepository.findOne(id)
  }

  async getProductDTOs(products: DocumentProduct[]) {
    const productDTOs = await Promise.all(
      R.map(async (product: DocumentProduct) => {
        const customFieldIds = R.map(
          (customValue: DocumentCustomValues) => customValue.customField,
          product.customValues
        )
        let customValuesDTOs = R.map((customValue: DocumentCustomValues) => {
          return new CustomValuesDTO(customValue)
        }, product.customValues)
        const customFields = await this.customFieldService.getCustomFieldsByIds(
          Models.Product,
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

        return new ProductDTO(product, extendedCustomValuesDTO)
      }, products)
    )

    return productDTOs
  }
  async getProdcutsByStoreId(storeId: string) {
    const products = await this.productRepository.find({
      store: storeId,
    })

    return await this.getProductDTOs(products)
  }
  async createNewProduct(payload: createProductDTO) {
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
      Models.Product
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
      const type = customFields.find((x) =>
        x._id.equals(customValue.customField)
      )!.type

      if (
        !(
          (type === Types.Date &&
            typeof customValue.value === 'string' &&
            isDate(customValue.value)) ||
          type === typeof customValue.value
        )
      ) {
        throw new Error('custom Field type not matched')
      }
    }, payload.customValues ?? [])

    return await this.productRepository.create(payload)
  }
  async getProductsByIds(ids: string[]) {
    return await this.productRepository.find({
      _id: { $in: ids },
    })
  }
  async deleteCustomValues(
    storeId: string | Schema.Types.ObjectId,
    customFieldId: string
  ) {
    return await this.productRepository.removeCustomField(
      storeId,
      customFieldId
    )
  }
}
