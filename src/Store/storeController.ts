import { Request, ResponseToolkit } from "@hapi/hapi";
import { StoreService } from "./storeService";
import { injectable } from "tsyringe";

@injectable()
export class StoreController {
	constructor(private readonly storeService: StoreService) {}

	getAllStores = async (req: Request, h: ResponseToolkit) => {
		return h.response(await this.storeService.getAllStores()).code(200);
	};

	getStoreById = async (req: Request, h: ResponseToolkit) => {
		return h.response(
			(await this.storeService.getStoreById(req.params.id)) ?? undefined
		);
	};

	createNewStore = async (req: Request, h: ResponseToolkit) => {
		return h
			.response(await this.storeService.createNewStore(req.payload))
			.code(201);
	};

	getStoreOrders = async (req: Request, h: ResponseToolkit) => {};
}
