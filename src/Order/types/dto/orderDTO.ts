import { ObjectID } from 'bson'
import { Schema } from 'mongoose'
import { CustomValuesDTO } from '~/base'
import { CustomerDTO } from '~/Customer'
import { DocumentOrder } from '~/Order'
import { ProductDTO } from '~/Product'

export class OrderDTO {
  constructor(order: DocumentOrder, customValues: CustomValuesDTO[]) {
    this._id = order._id
    this.status = order.status
    this.customer = order.customer
    this.price = order.price
    this.customValues = customValues
    this.products = order.products
  }
  _id: string | ObjectID

  status: string

  customer: string | ObjectID | CustomerDTO

  price: number

  products: string[] | Schema.Types.ObjectId[] | ProductDTO[]

  customValues: CustomValuesDTO[]
}
