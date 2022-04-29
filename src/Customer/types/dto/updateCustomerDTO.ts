import * as yup from 'yup'
import { DocumentCustomValues } from '~/base'

export const updateCustomerSchema = yup.object().shape({
  name: yup.string(),
  customValues: yup.array().of(yup.mixed<DocumentCustomValues>().required()),
})

export type updateCustomerDTO = {
  name?: string

  customValues?: (DocumentCustomValues & { _id: string })[]
}
