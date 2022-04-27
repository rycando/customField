import { Schema } from "mongoose";

export interface DocumentCustomValues {
	customField: Schema.Types.ObjectId;

	value: any;
}

export const SchemaCustomValues = new Schema({
	customField: {
		type: Schema.Types.ObjectId,
		ref: "CustomField",
		required: true,
		index: true,
	},
	value: {
		type: Schema.Types.Mixed,
		required: true,
	},
});
