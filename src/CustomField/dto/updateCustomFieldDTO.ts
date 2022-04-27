import * as yup from "yup";

export const updateCustomFieldSchema = yup.object().shape({
	fieldName: yup.string(),
	required: yup.boolean(),
});

export type updateCustomFieldDTO = {
	fieldName: string;

	required: boolean;
};
