import { Service } from "typedi";
import { DocumentProduct, Product } from "./entities/Product";
import { Repository } from "~/base/Repository";

@Service()
export class ProductRepository implements Repository<DocumentProduct> {
	async find(option?: any) {
		return await Product.find(option);
	}
	async findOne(id?: string, option?: any) {
		return await Product.findOne({ _id: id, ...option });
	}
	async create(payload: any) {
		return await Product.create({
			...payload,
		});
	}
}
