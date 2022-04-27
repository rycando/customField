import * as Hapi from "@hapi/hapi";
import { Inject, Service } from "typedi";
import { CustomerRouter } from "./customerRouter";
import { OrderRouter } from "./orderRouter";
import { ProductRouter } from "./productRouter";
import { StoreRouter } from "./storeRouter";

export interface RouterIstance {
	routers: Hapi.ServerRoute[];
	basePath: string;
}

@Service()
export class Router {
	constructor(
		@Inject("server") private readonly server: Hapi.Server,
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
