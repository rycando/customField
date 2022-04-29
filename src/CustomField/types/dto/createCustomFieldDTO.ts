import * as yup from 'yup'
import { Models, objectIdSchema, Types } from '~/base'

export const createCustomFieldSchema = yup.object().shape({
  store: objectIdSchema,
  fieldName: yup.string().required(),
  onModel: yup
    .mixed<keyof typeof Models>()
    .oneOf(Object.values(Models))
    .required(),
  type: yup.mixed<keyof typeof Types>().oneOf(Object.values(Types)).required(),
  required: yup.boolean().required(),
})

export type createCustomFieldDTO = {
  store: string

  fieldName: string

  onModel: Models

  type: Types

  required: boolean
}
