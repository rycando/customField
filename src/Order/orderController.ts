import { Service } from "typedi";
import { OrderService } from "./orderService";

@Service()
export class OrderController {
	constructor(private readonly orderService: OrderService) {}
}
