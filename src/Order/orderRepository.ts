import { Order } from "./entities/Order";
import { injectable } from "tsyringe";

@injectable()
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
	async findOneAndUpdate(id: string, payload: any) {
		return await Order.findOneAndUpdate(
			{
				_id: id,
			},
			{ ...payload },
			{ new: true }
		);
	}
}
