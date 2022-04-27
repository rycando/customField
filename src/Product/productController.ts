import { Request, ResponseToolkit } from "@hapi/hapi";
import { Service } from "typedi";
import { ProductService } from "./productService";

@Service()
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	getAllProducts = async (req: Request, h: ResponseToolkit) => {
		return h.response(await this.productService.getAllProducts()).code(200);
	};

	getProductById = async (req: Request, h: ResponseToolkit) => {
		return h.response(
			(await this.productService.getProductById(req.params.id)) ??
				undefined
		);
	};

	createNewProduct = async (req: Request, h: ResponseToolkit) => {
		return h
			.response(await this.productService.createNewProduct(req.payload))
			.code(201);
	};
}
