import _ from 'lodash'
import { ObjectId } from 'mongoose'
import * as R from 'ramda'
import { injectable } from 'tsyringe'
import { Customer, DocumentCustomer } from '~/Customer'

@injectable()
export class CustomerRepository {
  async find(option?: any) {
    return await Customer.find({ ...option, deleted: false })
  }
  async findOne(id?: string, option?: any) {
    return await Customer.findOne({ _id: id, ...option, deleted: false })
  }
  async create(payload: any) {
    return await Customer.create({
      ...payload,
    })
  }
  async removeCustomField(storeId: string | ObjectId, customFieldId: string) {
    const customers = await this.find({
      store: storeId,
      customValues: { $elemMatch: { customField: customFieldId } },
    })

    return await Promise.all(
      R.map(async (customer: DocumentCustomer) => {
        customer.customValues = _.remove(
          customer.customValues,
          (x) => x.customField === customFieldId
        )
        return await customer.save()
      }, customers)
    )
  }
}
