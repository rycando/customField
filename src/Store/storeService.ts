import { delay, inject, injectable } from 'tsyringe'
import { createStoreDTO, StoreRepository, updateStoreDTO } from '~/Store'

@injectable()
export class StoreService {
  constructor(
    @inject(delay(() => StoreRepository))
    private readonly storeRepository: StoreRepository
  ) {}

  async getAllStores() {
    return await this.storeRepository.find()
  }
  async getStoreById(id: string) {
    return await this.storeRepository.findOne(id)
  }
  async createNewStore(payload: createStoreDTO) {
    const alreadyExistingStore = await this.storeRepository.find({
      name: payload.name,
    })

    if (alreadyExistingStore.length) {
      throw new Error('already existing store')
    }

    return await this.storeRepository.create(payload)
  }
  async updateStore(id: string, payload: updateStoreDTO) {
    const updatedStore = await this.storeRepository.findOneAndUpdate(
      id,
      payload
    )
    if (!updatedStore) {
      throw new Error('corredspond store not found')
    }
    return updatedStore
  }
}
