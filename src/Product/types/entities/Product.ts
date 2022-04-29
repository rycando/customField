import { Document, model, Schema } from 'mongoose'
import mongooseDelete from 'mongoose-delete'
import mongooseTimestamp from 'mongoose-timestamp'
import { DocumentCustomValues, SchemaCustomValues } from '~/base'

export interface DocumentProduct extends Document {
  store: string

  name: string

  price: number

  categories: string[]

  customValues: DocumentCustomValues[]
}

const SchemaProduct = new Schema<DocumentProduct>({
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    index: true,
  },
  price: {
    type: Number,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
    index: true,
  },
  customValues: {
    type: [SchemaCustomValues],
    required: false,
  },
})

SchemaProduct.plugin(mongooseTimestamp)
SchemaProduct.plugin(mongooseDelete, { deletedAt: true })

export const Product = model<DocumentProduct>(
  'Product',
  SchemaProduct,
  'products'
)
