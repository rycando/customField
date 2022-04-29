import { Document, model, Schema } from 'mongoose'
import mongooseDelete from 'mongoose-delete'
import mongooseTimestamp from 'mongoose-timestamp'
import { DocumentCustomValues, OrderStatus, SchemaCustomValues } from '~/base'

export interface DocumentOrder extends Document {
  store: string

  status: string

  customer: string

  products: Schema.Types.ObjectId[]

  price: number

  customValues: DocumentCustomValues[]
}

const SchemaOrder = new Schema<DocumentOrder>({
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
    index: true,
  },
  status: {
    type: String,
    enum: Object.values(OrderStatus),
    required: true,
    index: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
    index: true,
  },
  products: {
    type: [Schema.Types.ObjectId],
    ref: 'Product',
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  customValues: {
    type: [SchemaCustomValues],
    required: false,
  },
})

SchemaOrder.plugin(mongooseTimestamp)
SchemaOrder.plugin(mongooseDelete, { deletedAt: true })

export const Order = model<DocumentOrder>('Order', SchemaOrder, 'orders')
