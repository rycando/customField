import { OrderRepository } from "./orderRepository";
import { Service } from "typedi";

@Service()
export class OrderService {
	constructor(private readonly orderRepository: OrderRepository) {}
}
