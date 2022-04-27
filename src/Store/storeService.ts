import { Service } from "typedi";
import { StoreRepository } from "./storeRepository";

@Service()
export class StoreService {
	constructor(private readonly storeRepository: StoreRepository) {}

	async getAllStores() {
		return await this.storeRepository.find();
	}
	async getStoreById(id: string) {
		return await this.storeRepository.findOne(id);
	}
	async createNewStore(payload: any) {
		return await this.storeRepository.create(payload);
	}
}
