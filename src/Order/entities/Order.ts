import { Document, Schema, model } from "mongoose";
import mongooseTimestamp from "mongoose-timestamp";
import mongooseDelete from "mongoose-delete";

export interface DocumentOrder extends Document {
	store: Schema.Types.ObjectId;

	status: string;

	customer: Schema.Types.ObjectId;

	products: Schema.Types.ObjectId[];

	price: number;
}

const SchemaOrder = new Schema<DocumentOrder>({
	store: {
		type: Schema.Types.ObjectId,
		ref: "Store",
		required: true,
		index: true,
	},
	status: {
		type: String,
		required: true,
		index: true,
	},
	customer: {
		type: Schema.Types.ObjectId,
		ref: "Customer",
		required: true,
		index: true,
	},
	products: {
		type: [Schema.Types.ObjectId],
		ref: "Product",
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
});

SchemaOrder.plugin(mongooseTimestamp);
SchemaOrder.plugin(mongooseDelete, { deletedAt: true });

export const Order = model<DocumentOrder>("Order", SchemaOrder, "orders");
