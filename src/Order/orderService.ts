import { OrderRepository } from "./orderRepository";
import {
	OrderStateMachine,
	OrderTransition,
} from "~/libraries/OrderStateMachine";
import { StoreService } from "~/Store";
import { CustomerService } from "~/Customer";
import { createOrderDTO } from "./dto";
import { ProductService } from "~/Product";
import * as R from "ramda";
import { DocumentCustomValues } from "~/base/CustomValues";
import { CustomFieldService } from "~/CustomField";
import _ from "lodash";
import { Types } from "~/base/Types";
import { injectable, inject, delay } from "tsyringe";

@injectable()
export class OrderService {
	constructor(
		private readonly orderRepository: OrderRepository,
		@inject(delay(() => OrderStateMachine))
		private readonly orderStateMachine: OrderStateMachine,
		private readonly storeService: StoreService,
		private readonly customerService: CustomerService,
		private readonly productService: ProductService,
		private readonly customFieldService: CustomFieldService
	) {}

	getAllOrders = async () => {
		return await this.orderRepository.find();
	};
	async getOrderById(id: string) {
		return await this.orderRepository.findOne(id);
	}
	async getStoreOrders(storeId: string) {
		return await this.orderRepository.find({
			store: storeId,
		});
	}
	async createNewOrder(payload: createOrderDTO) {
		const store = await this.storeService.getStoreById(payload.store);

		if (!store) {
			throw new Error("correspond store not found");
		}

		const customer = await this.customerService.getCustomerById(
			payload.customer
		);

		if (!customer) {
			throw new Error("correspond customer not found");
		}

		const products = await this.productService.getProductsByIds(
			payload.products
		);

		if (products.length !== payload.products.length) {
			throw new Error("correspond product not found");
		}

		const customFieldIds = _.uniq(
			R.map(
				(customValue: DocumentCustomValues) => customValue.customField,
				payload.customValues
			)
		);
		const customFields = await this.customFieldService.getCustomFieldsByIds(
			customFieldIds
		);

		if (customFields.length !== customFieldIds.length) {
			throw new Error("correspond customField not found");
		}

		R.map(async (customValue: DocumentCustomValues) => {
			const type = customFields.find(
				(x) => x._id === customValue.customField
			)!.type;

			if (
				!(
					(type === Types.Date &&
						typeof customValue.value === "object" &&
						customValue.value instanceof Date) ||
					type !== typeof customValue.value
				)
			) {
				throw new Error("custom Field type not matched");
			}
		}, payload.customValues);

		return await this.orderRepository.create(payload);
	}
	async changeStatus(id: string, transition: OrderTransition) {
		const order = await this.orderRepository.findOne(id);

		return order
			? await this.orderStateMachine.changeState({ order, transition })
			: order;
	}
}
