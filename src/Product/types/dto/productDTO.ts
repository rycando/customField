import { ObjectID } from 'bson'
import { CustomValuesDTO } from '~/base'
import { DocumentProduct } from '~/Product'

export class ProductDTO {
  constructor(product: DocumentProduct, customValues: CustomValuesDTO[]) {
    this._id = product._id
    this.name = product.name
    this.price = product.price
    this.categories = product.categories
    this.customValues = customValues
  }
  _id: string | ObjectID

  name: string

  price: number

  categories: string[]

  customValues: CustomValuesDTO[]
}
