import * as yup from "yup";
import { DocumentCustomValues } from "~/base/CustomValues";
import { Categories } from "~/base/Categories";
import { objectIdSchema } from "~/base/objectIdSchema";

export const createProductSchema = yup.object().shape({
	store: objectIdSchema,
	name: yup.string().required(),
	price: yup.number().required(),
	categories: yup
		.array()
		.of(
			yup
				.mixed<keyof typeof Categories>()
				.oneOf(Object.values(Categories))
				.required()
		)
		.required(),
	customValues: yup.array().of(
		yup.object().shape({
			customField: objectIdSchema,
			value: yup.mixed().required(),
		})
	),
});

export type createProductDTO = {
	store: string;

	name: string;

	price: number;

	categories: Categories[];

	customValues: DocumentCustomValues[];
};
