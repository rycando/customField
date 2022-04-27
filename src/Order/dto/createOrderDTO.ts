import * as yup from "yup";
import { OrderStatus } from "~/base/OrderStatus";
import { DocumentCustomValues } from "~/base/CustomValues";
import { objectIdSchema } from "~/base/objectIdSchema";

export const createOrderSchema = yup.object().shape({
	store: objectIdSchema,
	status: yup
		.mixed<keyof typeof OrderStatus>()
		.oneOf(Object.values(OrderStatus))
		.required()
		.default(OrderStatus.PENDING),
	customer: objectIdSchema,
	products: yup.array().of(objectIdSchema).required(),
	customValues: yup.array().of(
		yup.object().shape({
			customField: objectIdSchema,
			value: yup.mixed().required(),
		})
	),
});

export type createOrderDTO = {
	store: string;

	status: OrderStatus;

	customer: string;

	products: string[];

	customValues: DocumentCustomValues[];
};
