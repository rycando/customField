import { injectable } from 'tsyringe'
import { CustomField } from '~/CustomField'

@injectable()
export class CustomFieldRepository {
  async find(option?: any, withDeleted?: boolean) {
    return await CustomField.find({
      ...option,
      ...(withDeleted ? null : { deleted: false }),
    })
  }
  async findOne(id?: string, option?: any) {
    return await CustomField.findOne({
      _id: id,
      ...option,
      deleted: false,
    })
  }
  async create(payload: any) {
    return await CustomField.create({
      ...payload,
    })
  }
  async findOneAndUpdate(id: string, payload: any) {
    return await CustomField.findOneAndUpdate(
      { _id: id, deleted: false },
      {
        ...payload,
      },
      { new: true }
    )
  }
  async findOneAndDelete(id: string) {
    const customField = await CustomField.findOne({
      _id: id,
      deleted: false,
    })
    return customField?.delete()
  }
}
