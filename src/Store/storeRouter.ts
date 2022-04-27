import { RouterIstance } from "../routes/routes";
import * as Hapi from "@hapi/hapi";
import { StoreController } from "~/Store";
import { OrderController } from "~/Order";
import { injectable, inject, delay } from "tsyringe";

@injectable()
export class StoreRouter implements RouterIstance {
	constructor(
		@inject(delay(() => StoreController))
		private readonly storeController: StoreController,
		@inject(delay(() => OrderController))
		private readonly orderController: OrderController
	) {
		this._basePath = "/stores";

		this._routers = [
			{
				method: "GET",
				path: `${this._basePath}/`,
				handler: this.storeController.getAllStores,
			},
			{
				method: "GET",
				path: `${this._basePath}/{id}`,
				handler: this.storeController.getStoreById,
			},
			{
				method: "GET",
				path: `${this._basePath}/{id}/orders`,
				handler: this.orderController.getStoreOrders,
			},
			{
				method: "POST",
				path: `${this._basePath}/`,
				handler: this.storeController.createNewStore,
			},
		];
	}

	private _basePath: string;
	private _routers: Hapi.ServerRoute[];

	get basePath() {
		return this._basePath;
	}
	get routers() {
		return this._routers;
	}
}
