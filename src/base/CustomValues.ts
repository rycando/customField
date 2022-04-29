import { Schema } from 'mongoose'

/**
 * 사용자 정의 필드의 값 객체 스키마
 */
export interface DocumentCustomValues {
  /**
   * 사용자 정의 필드 ID
   */
  customField: string

  /** 사용자 정의 필드 값 */
  value: any
}

export const SchemaCustomValues = new Schema({
  customField: {
    type: Schema.Types.ObjectId,
    ref: 'CustomField',
    required: true,
    index: true,
  },
  value: {
    type: Schema.Types.Mixed,
    required: true,
  },
})
