import * as yup from 'yup'

export const createStoreSchema = yup.object().shape({
  name: yup.string().required(),
})

export type createStoreDTO = {
  name: string
}
