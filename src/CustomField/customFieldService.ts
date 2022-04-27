import { CustomFieldRepository } from "./customFieldRepository";
import { Schema } from "mongoose";
import { injectable } from "tsyringe";

@injectable()
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
	async getCustomFieldsByIds(ids: string[] | Schema.Types.ObjectId[]) {
		return await this.customFieldRepository.find({
			_id: { $in: ids },
		});
	}
	async createNewCustomField(payload: any) {
		return await this.customFieldRepository.create(payload);
	}
	async updateNewCustomField(id: string, payload: any) {
		return await this.customFieldRepository.findOneAndUpdate(id, payload);
	}
	async deleteCustomField(id: string) {
		return await this.customFieldRepository.findOneAndDelete(id);
	}
}
