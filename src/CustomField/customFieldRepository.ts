import { DocumentCustomField, CustomField } from "./entities/CustomField";
import { Repository } from "~/base/Repository";
import { injectable } from "tsyringe";

@injectable()
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
	async findOneAndUpdate(id: string, payload: any) {
		return await CustomField.findOneAndUpdate(
			{ _id: id },
			{
				...payload,
			},
			{ new: true }
		);
	}
	async findOneAndDelete(id: string) {
		return await CustomField.findOneAndDelete({
			_id: id,
		});
	}
}
