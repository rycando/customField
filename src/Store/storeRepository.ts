import { Repository } from "~/base/Repository";
import { DocumentStore, Store } from "./entities/Store";
import { injectable } from "tsyringe";

@injectable()
export class StoreRepository implements Repository<DocumentStore> {
	async find(option?: any) {
		return await Store.find(option);
	}
	async findOne(id?: string, option?: any) {
		return await Store.findOne({ _id: id, ...option });
	}
	async create(payload: any) {
		return await Store.create({
			...payload,
		});
	}
}
