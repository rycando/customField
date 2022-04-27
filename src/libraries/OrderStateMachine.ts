import { OrderStatus } from "~/base/OrderStatus";
import StateMachine from "javascript-state-machine";
import { DocumentOrder } from "~/Order";
import { OrderRepository } from "~/Order";
import { injectable, inject, delay } from "tsyringe";

export enum OrderTransition {
	Confirm = "confirm",

	Cancel = "cancel",

	Refund = "refund",

	Prepare = "prepare",

	Send = "send",

	StartDeliver = "startDeliver",

	Arrive = "arrive",
}

export const transitions = [
	{
		name: OrderTransition.Confirm,
		from: OrderStatus.PENDING,
		to: OrderStatus.CONFIRMED,
	},
	{
		name: OrderTransition.Cancel,
		from: [
			OrderStatus.PENDING,
			OrderStatus.CONFIRMED,
			OrderStatus.PRODUCT_PERPARING,
		],
		to: OrderStatus.CANCELED,
	},
	{
		name: OrderTransition.Refund,
		from: [
			OrderStatus.PENDING,
			OrderStatus.CONFIRMED,
			OrderStatus.PRODUCT_PERPARING,
			OrderStatus.DELIVER_COMPLETE,
		],
		to: OrderStatus.REFUNDED,
	},
	{
		name: OrderTransition.Prepare,
		from: OrderStatus.CONFIRMED,
		to: OrderStatus.PRODUCT_PERPARING,
	},
	{
		name: OrderTransition.Send,
		from: OrderStatus.PRODUCT_PERPARING,
		to: OrderStatus.READY_TO_DELIVER,
	},
	{
		name: OrderTransition.StartDeliver,
		from: OrderStatus.READY_TO_DELIVER,
		to: OrderStatus.DELIVERING,
	},
	{
		name: OrderTransition.Arrive,
		from: OrderStatus.DELIVERING,
		to: OrderStatus.DELIVER_COMPLETE,
	},
];

@injectable()
export class OrderStateMachine {
	constructor(
		@inject(delay(() => OrderRepository))
		private readonly orderRepository: OrderRepository
	) {}

	private transitionMethods(order: DocumentOrder) {
		return {
			async onConfirm() {},
			async onCancel() {},
			async onRefund() {},
			async onPrepare() {},
			async onSend() {},
			async onStartDeliver() {},
			async onArrive() {},
		};
	}

	public changeState = async ({
		order,
		transition,
	}: {
		order: DocumentOrder;
		transition: OrderTransition;
	}) => {
		const fsm = new StateMachine({
			init: order.status,
			transitions,
			methods: this.transitionMethods(order),
		});

		await fsm[transition]?.();

		const updatedOrder = await this.orderRepository.findOneAndUpdate(
			order._id,
			{
				status: fsm.state,
			}
		);

		if (!updatedOrder) {
			throw new Error("Error 60809: 상태 변경에 실패했습니다.");
		}

		return updatedOrder!;
	};

	can(from: OrderStatus, to: OrderStatus) {
		const fsm = new StateMachine({
			init: from,
			transitions,
		});

		return fsm.can(to);
	}
	cannot(from: OrderStatus, to: OrderStatus) {
		const fsm = new StateMachine({
			init: from,
			transitions,
		});

		return fsm.cannot(to);
	}
}
