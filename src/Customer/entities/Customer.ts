import { Document, Schema, model } from "mongoose";
import mongooseTimestamp from "mongoose-timestamp";
import mongooseDelete from "mongoose-delete";
import { DocumentCustomValues, SchemaCustomValues } from "~/base/CustomValues";

export interface DocumentCustomer extends Document {
	store: Schema.Types.ObjectId;

	name: string;

	email: string;

	password: string;

	customValues: DocumentCustomValues[];
}

const SchemaCustomer = new Schema<DocumentCustomer>({
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
	email: {
		type: String,
		required: true,
		index: true,
	},
	password: {
		type: String,
		required: true,
	},
	customValues: {
		type: [SchemaCustomValues],
		required: false,
	},
});

SchemaCustomer.plugin(mongooseTimestamp);
SchemaCustomer.plugin(mongooseDelete);

export const Customer = model<DocumentCustomer>(
	"Customer",
	SchemaCustomer,
	"customers"
);
