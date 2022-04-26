import { Document, model, Schema } from "mongoose";
import mongooseTimestamp from "mongoose-timestamp";
import mongooseDelete from "mongoose-delete";

export interface DocumentStore extends Document {
	name: string;
}

const SchemaStore = new Schema<DocumentStore>({
	name: {
		type: String,
		required: true,
		index: true,
	},
});

SchemaStore.plugin(mongooseTimestamp);
SchemaStore.plugin(mongooseDelete, { deletedAt: true });

export const Store = model<DocumentStore>("Store", SchemaStore, "stores");
