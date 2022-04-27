import { Service } from "typedi";
import { DocumentCustomField, CustomField } from "./entities/CustomField";
import { Repository } from "~/base/Repository";

@Service()
export class CustomFieldRepository implements Repository<DocumentCustomField> {
	async find(option?: any) {
		return await CustomField.find(option);
	}
	async findOne(id?: string, option?: any) {
		return await CustomField.findOne({ _id: id, ...option });
	}
	async create(payload: any) {
		return await CustomField.create({
			...payload,
		});
	}
}
