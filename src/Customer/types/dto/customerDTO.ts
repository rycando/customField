import { ObjectID } from 'bson'
import { CustomValuesDTO } from '~/base'
import { DocumentCustomer } from '~/Customer'

export class CustomerDTO {
  constructor(customer: DocumentCustomer, customValues: CustomValuesDTO[]) {
    this._id = customer._id
    this.name = customer.name
    this.email = customer.email
    this.customValues = customValues
  }
  _id: string | ObjectID

  name: string

  email: string

  customValues: CustomValuesDTO[]
}
