import { Request, ResponseToolkit } from "@hapi/hapi";
import { Service } from "typedi";
import { OrderService } from "./orderService";

@Service()
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	getAllOrders = async (req: Request, h: ResponseToolkit) => {
		return h.response(await this.orderService.getAllOrders()).code(200);
	};

	getOrderById = async (req: Request, h: ResponseToolkit) => {
		return h.response(
			(await this.orderService.getOrderById(req.params.id)) ?? undefined
		);
	};

	createNewOrder = async (req: Request, h: ResponseToolkit) => {
		return h
			.response(await this.orderService.createNewOrder(req.payload))
			.code(201);
	};
}
