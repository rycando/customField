import { Service } from "typedi";
import { DocumentOrder, Order } from "./entities/Order";

@Service()
export class OrderRepository {
	async find(option?: any) {
		return await Order.find(option);
	}
	async findOne(id?: string, option?: any) {
		return await Order.findOne({ _id: id, ...option });
	}
	async create(payload: any) {
		return await Order.create({
			...payload,
		});
	}
}
