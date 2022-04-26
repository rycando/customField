import { RouterIstance } from "./routes";
import * as Hapi from "@hapi/hapi";
import { ProductController } from "~/Product";
import { Inject, Service } from "typedi";

@Service()
export class ProductRouter implements RouterIstance {
	constructor(
		@Inject() private readonly server: typeof Hapi.Server,
		private readonly productController: ProductController
	) {
		this._basePath = "/product";

		this._routers = [
			{
				method: "GET",
				path: `${this._basePath}/`,
				// handler: this.productController.getAllProducts(),
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
