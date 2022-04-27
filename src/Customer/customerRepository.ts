import { Repository } from "~/base/Repository";
import { Customer, DocumentCustomer } from "./entities/Customer";
import { injectable } from "tsyringe";

@injectable()
export class CustomerRepository implements Repository<DocumentCustomer> {
	async find(option?: any) {
		return await Customer.find(option);
	}
	async findOne(id?: string, option?: any) {
		return await Customer.findOne({ _id: id, ...option });
	}
	async create(payload: any) {
		return await Customer.create({
			...payload,
		});
	}
}
