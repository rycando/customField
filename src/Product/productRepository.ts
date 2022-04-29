import _ from 'lodash'
import { ObjectId } from 'mongoose'
import * as R from 'ramda'
import { injectable } from 'tsyringe'
import { DocumentProduct, Product } from '~/Product'

@injectable()
export class ProductRepository {
  async find(option?: any) {
    return await Product.find({ ...option, deleted: false })
  }
  async findOne(id?: string, option?: any) {
    return await Product.findOne({ _id: id, ...option, deleted: false })
  }
  async create(payload: any) {
    return await Product.create({
      ...payload,
    })
  }
  async removeCustomField(storeId: string | ObjectId, customFieldId: string) {
    const products = await this.find({
      store: storeId,
      customValues: { $elemMatch: { customField: customFieldId } },
    })

    return await Promise.all(
      R.map(async (customer: DocumentProduct) => {
        customer.customValues = _.remove(
          customer.customValues,
          (x) => x.customField === customFieldId
        )
        return await customer.save()
      }, products)
    )
  }
}
