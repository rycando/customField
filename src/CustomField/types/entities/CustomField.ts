import { Document, model, Schema } from 'mongoose'
import mongooseDelete from 'mongoose-delete'
import mongooseTimestamp from 'mongoose-timestamp'
import { Models, Types } from '~/base'

export interface DocumentCustomField extends Document {
  store: string

  fieldName: string

  onModel: string

  type: string

  required: boolean
}

const SchemaCustomField = new Schema<DocumentCustomField>({
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
    index: true,
  },
  fieldName: {
    type: String,
    required: true,
    index: true,
  },
  onModel: {
    type: String,
    required: true,
    enum: Object.values(Models),
    index: true,
  },
  type: {
    type: String,
    required: true,
    enum: Object.values(Types),
  },
  required: {
    type: Boolean,
    required: true,
  },
})

SchemaCustomField.plugin(mongooseTimestamp)
SchemaCustomField.plugin(mongooseDelete, { deletedAt: true })

export const CustomField = model<DocumentCustomField>(
  'CustomField',
  SchemaCustomField,
  'custom_fields'
)
