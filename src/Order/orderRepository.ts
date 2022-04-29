import { injectable } from 'tsyringe'

import { Order } from './types'

@injectable()
export class OrderRepository {
  async find(option?: any) {
    return await Order.find({ ...option, deleted: false })
  }
  async findOne(id?: string, option?: any) {
    return await Order.findOne({ _id: id, ...option, deleted: false })
  }
  async create(payload: any) {
    return await Order.create({
      ...payload,
    })
  }
  async findOneAndUpdate(id: string, payload: any) {
    return await Order.findOneAndUpdate(
      {
        _id: id,
        deleted: false,
      },
      { ...payload },
      { new: true }
    )
  }
}
