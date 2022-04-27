import { Service } from "typedi";
import { CustomFieldRepository } from "./customFieldRepository";

@Service()
export class CustomFieldService {
	constructor(
		private readonly customFieldRepository: CustomFieldRepository
	) {}

	getAllCustomFields = async () => {
		return await this.customFieldRepository.find();
	};
	async getCustomFieldById(id: string) {
		return await this.customFieldRepository.findOne(id);
	}
	async createNewCustomField(payload: any) {
		return await this.customFieldRepository.create(payload);
	}
}
