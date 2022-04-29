import * as yup from 'yup'

export const updateStoreSchema = yup.object().shape({
  name: yup.string(),
})

export type updateStoreDTO = {
  name?: string
}
