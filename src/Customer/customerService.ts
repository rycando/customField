import { Service } from "typedi";
import { CustomerRepository } from "./customerRepository";

@Service()
export class CustomerService {
	constructor(private readonly customerRepository: CustomerRepository) {}

	getAllCustomers = async () => {
		return await this.customerRepository.find();
	};
	async getCustomerById(id: string) {
		return await this.customerRepository.findOne(id);
	}
	async createNewCustomer(payload: any) {
		return await this.customerRepository.create(payload);
	}
}
