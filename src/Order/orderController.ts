import { Request, ResponseToolkit } from "@hapi/hapi";
import { OrderTransition } from "~/libraries/OrderStateMachine";
import logger from "~/tools/logger";
import { createOrderDTO, createOrderSchema } from "./dto";
import { OrderService } from "./orderService";
import { injectable } from "tsyringe";

@injectable()
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
	getStoreOrders = async (req: Request, h: ResponseToolkit) => {
		return h.response(
			(await this.orderService.getStoreOrders(req.params.id)) ?? undefined
		);
	};
	createNewOrder = async (req: Request, h: ResponseToolkit) => {
		createOrderSchema.validate(req.payload).catch((err) => {
			logger.info(
				`Log 7725: createOrderSchema validation Failed - ${err}`
			);

			return h.response("createOrderSchema validation Failed").code(400);
		});

		return this.orderService
			.createNewOrder(req.payload as createOrderDTO)
			.then((newOrder) => {
				return h.response(newOrder).code(201);
			})
			.catch((err) => {
				logger.info(`Log 247: ${err}`);
				return h.response(err).code(400);
			});
	};
	confirmOrder = async (req: Request, h: ResponseToolkit) => {
		const updatedOrder = await this.orderService.changeStatus(
			req.params.id,
			OrderTransition.Confirm
		);

		return updatedOrder
			? h.response(updatedOrder).code(200)
			: h.response("correspond Order Not found").code(404);
	};
	cancelOrder = async (req: Request, h: ResponseToolkit) => {
		const updatedOrder = await this.orderService.changeStatus(
			req.params.id,
			OrderTransition.Cancel
		);

		return updatedOrder
			? h.response(updatedOrder).code(200)
			: h.response("correspond Order Not found").code(404);
	};
	refundOrder = async (req: Request, h: ResponseToolkit) => {
		const updatedOrder = await this.orderService.changeStatus(
			req.params.id,
			OrderTransition.Refund
		);

		return updatedOrder
			? h.response(updatedOrder).code(200)
			: h.response("correspond Order Not found").code(404);
	};
	prepare = async (req: Request, h: ResponseToolkit) => {
		const updatedOrder = await this.orderService.changeStatus(
			req.params.id,
			OrderTransition.Prepare
		);

		return updatedOrder
			? h.response(updatedOrder).code(200)
			: h.response("correspond Order Not found").code(404);
	};
	send = async (req: Request, h: ResponseToolkit) => {
		const updatedOrder = await this.orderService.changeStatus(
			req.params.id,
			OrderTransition.Send
		);

		return updatedOrder
			? h.response(updatedOrder).code(200)
			: h.response("correspond Order Not found").code(404);
	};
	startDeliver = async (req: Request, h: ResponseToolkit) => {
		const updatedOrder = await this.orderService.changeStatus(
			req.params.id,
			OrderTransition.StartDeliver
		);

		return updatedOrder
			? h.response(updatedOrder).code(200)
			: h.response("correspond Order Not found").code(404);
	};
	arrive = async (req: Request, h: ResponseToolkit) => {
		const updatedOrder = await this.orderService.changeStatus(
			req.params.id,
			OrderTransition.Arrive
		);

		return updatedOrder
			? h.response(updatedOrder).code(200)
			: h.response("correspond Order Not found").code(404);
	};
}
