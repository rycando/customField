import { CustomerRepository } from "./customerRepository";
import { injectable } from "tsyringe";
import { StoreService } from "~/Store";
import { CustomFieldService } from "~/CustomField";
import { DocumentCustomValues } from "~/base/CustomValues";
import * as R from "ramda";
import { Types } from "~/base/Types";
import _ from "lodash";
import { createCustomerDTO } from "./dto";

@injectable()
export class CustomerService {
	constructor(
		private readonly customerRepository: CustomerRepository,
		private readonly storeService: StoreService,
		private readonly customFieldService: CustomFieldService
	) {}

	getAllCustomers = async () => {
		return await this.customerRepository.find();
	};
	async getCustomerById(id: string) {
		return await this.customerRepository.findOne(id);
	}
	async createNewCustomer(payload: createCustomerDTO) {
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

		const alreadyExistingCustomer = await this.customerRepository.find({
			email: payload.email,
		});

		if (alreadyExistingCustomer) {
			throw new Error("already existing Customer");
		}

		return await this.customerRepository.create(payload);
	}
}
