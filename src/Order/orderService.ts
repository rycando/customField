import { OrderRepository } from "./orderRepository";
import { Service } from "typedi";

@Service()
export class OrderService {
	constructor(private readonly orderRepository: OrderRepository) {}

	getAllOrders = async () => {
		return await this.orderRepository.find();
	};
	async getOrderById(id: string) {
		return await this.orderRepository.findOne(id);
	}
	async createNewOrder(payload: any) {
		return await this.orderRepository.create(payload);
	}
}
