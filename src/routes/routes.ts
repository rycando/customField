import { inject } from "tsyringe";
import * as Hapi from "@hapi/hapi";
import { CustomerRouter } from "~/Customer/";
import { OrderRouter } from "~/Order/";
import { ProductRouter } from "~/Product/";
import { StoreRouter } from "~/Store/";
import { injectable } from "tsyringe";

export interface RouterIstance {
	routers: Hapi.ServerRoute[];
	basePath: string;
}

@injectable()
export class Router {
	constructor(
		@inject("server") private readonly server: Hapi.Server,
		private readonly orderRouter: OrderRouter,
		private readonly customerRouter: CustomerRouter,
		private readonly productRouter: ProductRouter,
		private readonly storeRouter: StoreRouter
	) {
		this.server.route([
			...this.customerRouter.routers,
			...this.orderRouter.routers,
			...this.productRouter.routers,
			...this.storeRouter.routers,
		]);
	}
}
