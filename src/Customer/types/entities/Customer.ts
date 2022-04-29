import { Document, model, Schema } from 'mongoose'
import mongooseDelete from 'mongoose-delete'
import mongooseTimestamp from 'mongoose-timestamp'
import { DocumentCustomValues, SchemaCustomValues } from '~/base'

export interface DocumentCustomer extends Document {
  store: string

  name: string

  email: string

  password: string

  customValues: DocumentCustomValues[]
}

const SchemaCustomer = new Schema<DocumentCustomer>({
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
  email: {
    type: String,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  customValues: {
    type: [SchemaCustomValues],
    required: false,
  },
})

SchemaCustomer.plugin(mongooseTimestamp)
SchemaCustomer.plugin(mongooseDelete)

export const Customer = model<DocumentCustomer>(
  'Customer',
  SchemaCustomer,
  'customers'
)
