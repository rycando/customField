import { Service } from "typedi";
import { CustomFieldRepository } from "./customFieldRepository";

@Service()
export class customFieldServcie {
	constructor(
		private readonly customFieldRepository: CustomFieldRepository
	) {}
}
