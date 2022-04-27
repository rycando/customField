import { Service } from "typedi";
import { ProductRepository } from "./productRepository";

@Service()
export class ProductService {
	constructor(private readonly productRepository: ProductRepository) {}

	getAllProducts = async () => {
		return await this.productRepository.find();
	};
	async getProductById(id: string) {
		return await this.productRepository.findOne(id);
	}
	async createNewProduct(payload: any) {
		return await this.productRepository.create(payload);
	}
}
