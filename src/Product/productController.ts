import { Request, ResponseToolkit } from "@hapi/hapi";
import { ProductService } from "./productService";
import { injectable } from "tsyringe";
import { createProductDTO, createProductSchema } from "./dto";
import logger from "~/tools/logger";

@injectable()
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
		createProductSchema.validate(req.payload).catch((err) => {
			logger.info(
				`Log 53288: createProductSchema validation Failed - ${err}`
			);

			return h
				.response("createProductSchema validation Failed")
				.code(400);
		});

		return this.productService
			.createNewProduct(req.payload as createProductDTO)
			.then((newProduct) => {
				return h.response(newProduct).code(201);
			})
			.catch((err) => {
				logger.info(`Log 59719: ${err}`);
				return h.response(err).code(400);
			});
	};
}
