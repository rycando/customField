import { RouterIstance } from "./routes";
import * as Hapi from "@hapi/hapi";
import { CustomerController } from "~/Customer";
import { Inject, Service } from "typedi";

@Service()
export class CustomerRouter implements RouterIstance {
	constructor(
		@Inject() private readonly server: typeof Hapi.Server,
		private readonly customerController: CustomerController
	) {
		this._basePath = "/order";

		this._routers = [
			{
				method: "GET",
				path: `${this._basePath}/`,
				// handler: this.customerController.getAllCustomers(),
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
