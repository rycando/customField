import { RouterIstance } from "./routes";
import * as Hapi from "@hapi/hapi";
import { StoreController } from "~/Store";
import { Inject } from "typedi";

export class StoreRouter implements RouterIstance {
	constructor(
		@Inject() private readonly server: typeof Hapi.Server,
		private readonly storeController: StoreController
	) {
		this._basePath = "/store";

		this._routers = [
			{
				method: "GET",
				path: `${this._basePath}/`,
				// handler: this.storeController.getAllStores(),
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
