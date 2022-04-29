import { injectable } from 'tsyringe'
import { Store } from '~/Store'

@injectable()
export class StoreRepository {
  async find(option?: any) {
    return await Store.find({ ...option, deleted: false })
  }
  async findOne(id?: string, option?: any) {
    return await Store.findOne({ _id: id, ...option, deleted: false })
  }
  async create(payload: any) {
    return await Store.create({
      ...payload,
    })
  }
  async findOneAndUpdate(id: string, payload: any) {
    return await Store.findOneAndUpdate(
      { _id: id, deleted: false },
      {
        ...payload,
      },
      { new: true }
    )
  }
}
