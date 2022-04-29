import * as yup from 'yup'
import { DocumentCustomValues, objectIdSchema } from '~/base'

export const createCustomerSchema = yup.object().shape({
  store: objectIdSchema,
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  customValues: yup.array().of(
    yup.object().shape({
      customField: objectIdSchema,
      value: yup.mixed().required(),
    })
  ),
})

export type createCustomerDTO = {
  store: string

  name: string

  email: string

  password: string

  customValues: DocumentCustomValues[]
}
