import { Request, ResponseToolkit } from "@hapi/hapi";
import logger from "~/tools/logger";
import { CustomFieldService } from "./customFieldService";
import { createCustomFieldSchema, updateCustomFieldSchema } from "./dto";
import { injectable } from "tsyringe";

@injectable()
export class CustomFieldController {
	constructor(private readonly customFieldService: CustomFieldService) {}

	/////////////////////////////READ/////////////////////////////

	/**
	 * 모든 사용자 정의 필드를 가져옵니다
	 * @param req
	 * @param h
	 * @returns DocumentCustomerField[]
	 */
	getAllCustomFields = async (req: Request, h: ResponseToolkit) => {
		return h
			.response(await this.customFieldService.getAllCustomFields())
			.code(200);
	};

	/**
	 * ID에 해당하는 사용자 정의 필드를 가져옵니다
	 * @param req
	 * @param h
	 * @returns DocumentCustomerField | undefined
	 */
	getCustomFieldById = async (req: Request, h: ResponseToolkit) => {
		return h.response(
			(await this.customFieldService.getCustomFieldById(req.params.id)) ??
				undefined
		);
	};

	/////////////////////////////READ/////////////////////////////

	////////////////////////////CREATE////////////////////////////
	/**
	 * 사용자 정의 필드를 생성합니다
	 * @param req
	 * @param h
	 * @returns DocumentCustomerField
	 */
	createNewCustomField = async (req: Request, h: ResponseToolkit) => {
		createCustomFieldSchema.validate(req.payload).catch((err) => {
			logger.info(
				`Log 7725: createCustomFieldSchema validation Failed - ${err}`
			);

			return h
				.response("createCustomFieldSchema validation Failed")
				.code(400);
		});

		return h
			.response(
				await this.customFieldService.createNewCustomField(req.payload)
			)
			.code(201);
	};
	////////////////////////////CREATE////////////////////////////

	////////////////////////////UPDATE////////////////////////////

	/**
	 * ID에 해당하는 사용자 정의 필드를 업데이트 합니다.
	 * 필드 이름과 필수 입력 여부만 업데이트 될 수 있습니다.
	 * @param req
	 * @param h
	 * @returns DocumentCustomerField
	 */
	updateCustomField = async (req: Request, h: ResponseToolkit) => {
		updateCustomFieldSchema.validate(req.payload).catch((err) => {
			logger.info(
				`Log 17575: updateCustomFieldSchema validation Failed - ${err}`
			);

			return h
				.response("updateCustomFieldSchema validation Failed")
				.code(400);
		});

		const updatedCustomField =
			await this.customFieldService.updateNewCustomField(
				req.params.id,
				req.payload
			);

		return updatedCustomField
			? h.response(updatedCustomField).code(200)
			: h.response("corresponding customField not found").code(404);
	};

	////////////////////////////UPDATE////////////////////////////

	////////////////////////////DELETE////////////////////////////

	/**
	 * ID에 해당하는 사용자 정의 필드를 삭제합니다
	 * @param req
	 * @param h
	 * @returns DocumentCustomerField
	 */
	deleteCustomField = async (req: Request, h: ResponseToolkit) => {
		const deletedCustomField =
			await this.customFieldService.deleteCustomField(req.params.id);
		return deletedCustomField
			? h.response(deletedCustomField).code(200)
			: h.response("corresponding customField not found").code(404);
	};

	////////////////////////////DELETE////////////////////////////
}
