import { ObjectID } from 'bson'
import { DocumentCustomValues } from '~/base'
import { CustomFieldDTO } from '~/CustomField'

/**
 * 사용자 정의 필드 값 객체 DTO
 */
export class CustomValuesDTO {
  constructor(customValues: DocumentCustomValues) {
    this.value = customValues.value
    this.customField = customValues.customField
  }

  public customField: CustomFieldDTO | string | ObjectID

  public value: any
}
