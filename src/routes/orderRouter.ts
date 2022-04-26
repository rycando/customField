import { RouterIstance } from "./routes";
import * as Hapi from "@hapi/hapi";
import { OrderController } from "~/Order";
import { Inject } from "typedi";

export class OrderRouter implements RouterIstance {
	constructor(
		@Inject() private readonly server: typeof Hapi.Server,
		private readonly orderController: OrderController
	) {
		this._basePath = "/order";

		this._routers = [
			{
				method: "GET",
				path: `${this._basePath}/`,
				handler: this.orderController.getAllOrders(),
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
