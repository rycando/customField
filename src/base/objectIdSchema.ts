import { ObjectId } from "bson";
import * as yup from "yup";
import { mixed } from "yup";

export const objectIdSchema = yup
	.mixed<ObjectId>()
	.test((input) => input instanceof ObjectId)
	.transform((value: any, input, ctx) => {
		if (ctx.isType(value)) return value;
		return new ObjectId(value);
	})
	.required();
