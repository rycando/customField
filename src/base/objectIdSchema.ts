import * as yup from 'yup'

/** ObjectId 타입 validation 스키마 */
export const objectIdSchema = yup.string().length(24).required()
