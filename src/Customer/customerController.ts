import { Request, ResponseToolkit } from "@hapi/hapi";
import { Service } from "typedi";
import { CustomerService } from "./customerService";

@Service()
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
		return h
			.response(await this.customerService.createNewCustomer(req.payload))
			.code(201);
	};
}
