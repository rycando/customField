import { Document, Schema, model } from "mongoose";
import mongooseTimestamp from "mongoose-timestamp";
import mongooseDelete from "mongoose-delete";

export interface DocumentCustomValues {
	customField: Schema.Types.ObjectId;

	value: any;
}

export interface DocumentProduct extends Document {
	store: Schema.Types.ObjectId;

	name: string;

	price: number;

	categories: string[];

	customValues: DocumentCustomValues[];
}

const SchemaCustomValues = new Schema({
	customField: {
		type: Schema.Types.ObjectId,
		required: true,
		index: true,
	},
	value: {
		type: Schema.Types.Mixed,
		required: true,
	},
});

const SchemaProduct = new Schema<DocumentProduct>({
	store: {
		type: Schema.Types.ObjectId,
		ref: "Store",
		required: true,
		index: true,
	},
	name: {
		type: String,
		required: true,
		index: true,
	},
	price: {
		type: Number,
		required: true,
	},
	categories: {
		type: [String],
		required: true,
		index: true,
	},
	customValues: {
		type: [SchemaCustomValues],
		required: false,
	},
});

SchemaProduct.plugin(mongooseTimestamp);
SchemaProduct.plugin(mongooseDelete, { deletedAt: true });

export const Product = model<DocumentProduct>(
	"Product",
	SchemaProduct,
	"products"
);
