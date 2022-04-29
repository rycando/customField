import { Schema } from 'mongoose'
import { delay, inject, injectable } from 'tsyringe'
import { Models } from '~/base'
import { CustomFieldRepository } from '~/CustomField'

@injectable()
export class CustomFieldService {
  constructor(
    @inject(delay(() => CustomFieldRepository))
    private readonly customFieldRepository: CustomFieldRepository
  ) {}

  getAllCustomFields = async () => {
    return await this.customFieldRepository.find()
  }
  async getCustomFieldById(id: string) {
    const customField = await this.customFieldRepository.findOne(id)

    if (!customField) {
      throw new Error('correspond CustomField not found')
    }

    return customField
  }
  async getCustomFieldsByIds(
    model: Models,
    ids: string[] | Schema.Types.ObjectId[]
  ) {
    return await this.customFieldRepository.find(
      {
        _id: { $in: ids },
        onModel: model,
      },
      true
    )
  }
  async getCustomFieldsByModel(store: string, model: Models) {
    return await this.customFieldRepository.find({
      store: store,
      onModel: model,
    })
  }
  async createNewCustomField(payload: any) {
    return await this.customFieldRepository.create(payload)
  }
  async updateNewCustomField(id: string, payload: any) {
    return await this.customFieldRepository.findOneAndUpdate(id, payload)
  }
  async deleteCustomField(id: string) {
    return await this.customFieldRepository.findOneAndDelete(id)
  }
}
