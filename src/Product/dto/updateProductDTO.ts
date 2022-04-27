import * as yup from "yup";
import { DocumentCustomValues } from "~/base/CustomValues";
import { Categories } from "~/base/Categories";

export const updateProductSchema = yup.object().shape({
	name: yup.string(),
	price: yup.number(),
	categories: yup
		.array()
		.of(
			yup
				.mixed<keyof typeof Categories>()
				.oneOf(Object.values(Categories))
				.required()
		),
	customValues: yup.array().of(yup.mixed<DocumentCustomValues>().required()),
});

export type updateProductDTO = {
	name: string;

	price: number;

	categories: Categories[];

	customValues: (DocumentCustomValues & { _id: string })[];
};
