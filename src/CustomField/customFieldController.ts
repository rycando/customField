import { Request, ResponseToolkit } from "@hapi/hapi";
import { Service } from "typedi";
import { CustomFieldService } from "./customFieldService";
@Service()
export class CustomFieldController {
	constructor(private readonly customFieldService: CustomFieldService) {}

	getAllCustomFields = async (req: Request, h: ResponseToolkit) => {
		return h
			.response(await this.customFieldService.getAllCustomFields())
			.code(200);
	};

	getCustomFieldById = async (req: Request, h: ResponseToolkit) => {
		return h.response(
			(await this.customFieldService.getCustomFieldById(req.params.id)) ??
				undefined
		);
	};

	createNewCustomField = async (req: Request, h: ResponseToolkit) => {
		return h
			.response(
				await this.customFieldService.createNewCustomField(req.payload)
			)
			.code(201);
	};
}
