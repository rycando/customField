import { ProductRepository } from "./productRepository";
import { injectable, inject, delay } from "tsyringe";
import { StoreService } from "~/Store";
import * as R from "ramda";
import _ from "lodash";
import { DocumentCustomValues } from "~/base/CustomValues";
import { CustomFieldService } from "~/CustomField";
import { Types } from "~/base/Types";

@injectable()
export class ProductService {
	constructor(
		private readonly productRepository: ProductRepository,
		@inject(delay(() => StoreService))
		private readonly storeService: StoreService,
		private readonly customFieldService: CustomFieldService
	) {}

	getAllProducts = async () => {
		return await this.productRepository.find();
	};
	async getProductById(id: string) {
		return await this.productRepository.findOne(id);
	}
	async createNewProduct(payload: any) {
		const store = await this.storeService.getStoreById(payload.store);

		if (!store) {
			throw new Error("correspond store not found");
		}

		const customFieldIds = _.uniq(
			R.map(
				(customValue: DocumentCustomValues) => customValue.customField,
				payload.customValues
			)
		);
		const customFields = await this.customFieldService.getCustomFieldsByIds(
			customFieldIds
		);

		if (customFields.length !== customFieldIds.length) {
			throw new Error("correspond customField not found");
		}

		R.map(async (customValue: DocumentCustomValues) => {
			const type = customFields.find(
				(x) => x._id === customValue.customField
			)!.type;

			if (
				!(
					(type === Types.Date &&
						typeof customValue.value === "object" &&
						customValue.value instanceof Date) ||
					type !== typeof customValue.value
				)
			) {
				throw new Error("custom Field type not matched");
			}
		}, payload.customValues);

		return await this.productRepository.create(payload);
	}
	async getProductsByIds(ids: string[]) {
		return await this.productRepository.find({
			_id: { $in: ids },
		});
	}
}
