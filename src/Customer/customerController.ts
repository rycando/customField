import { Request, ResponseToolkit } from "@hapi/hapi";
import { CustomerService } from "./customerService";
import { injectable } from "tsyringe";
import {
	createCustomerDTO,
	createCustomerSchema,
} from "./dto/createCustomerDTO";
import logger from "~/tools/logger";

@injectable()
export class CustomerController {
	constructor(private readonly customerService: CustomerService) {}

	getAllCustomers = async (req: Request, h: ResponseToolkit) => {
		return h
			.response(await this.customerService.getAllCustomers())
			.code(200);
	};

	getCustomerById = async (req: Request, h: ResponseToolkit) => {
		return h.response(
			(await this.customerService.getCustomerById(req.params.id)) ??
				undefined
		);
	};

	createNewCustomer = async (req: Request, h: ResponseToolkit) => {
		createCustomerSchema.validate(req.payload).catch((err) => {
			logger.info(
				`Log 48709: createCustomerSchema validation Failed - ${err}`
			);

			return h
				.response("createCustomerSchema validation Failed")
				.code(400);
		});

		return this.customerService
			.createNewCustomer(req.payload as createCustomerDTO)
			.then((newCustomer) => {
				return h.response(newCustomer).code(201);
			})
			.catch((err) => {
				logger.info(`Log 247: ${err}`);
				return h.response(err).code(400);
			});
	};
}
