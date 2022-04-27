import { RouterIstance } from "./routes";
import * as Hapi from "@hapi/hapi";
import { StoreController } from "~/Store";
import { Inject, Service } from "typedi";

@Service()
export class StoreRouter implements RouterIstance {
	constructor(private readonly storeController: StoreController) {
		this._basePath = "/store";

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
