import { ObjectID } from 'bson'
import { DocumentCustomField } from '~/CustomField'

/** 사용자 정의 필드 DTO */
export class CustomFieldDTO {
  constructor(customField: DocumentCustomField) {
    this._id = customField._id
    this.fieldName = customField.fieldName
    this.type = customField.type
    this.required = customField.required
  }
  public _id: string | ObjectID

  public fieldName: string

  public type: string

  public required: boolean
}
