import { DocumentProduct, Product } from "./entities/Product";
import { Repository } from "~/base/Repository";
import { injectable } from "tsyringe";

@injectable()
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
