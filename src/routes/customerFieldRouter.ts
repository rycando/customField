import { RouterIstance } from "./routes";
import * as Hapi from "@hapi/hapi";
import { CustomFieldController } from "~/CustomField";
import { Inject, Service } from "typedi";

@Service()
export class CustomFieldRouter implements RouterIstance {
	constructor(
		@Inject() private readonly server: typeof Hapi.Server,
		private readonly customFieldController: CustomFieldController
	) {
		this._basePath = "/customField";

		this._routers = [
			{
				method: "GET",
				path: `${this._basePath}/`,
				// handler: this.customFieldController.getAllCustomFields(),
			},
		];
	}

	private _basePath: string;
	private _routers: Hapi.ServerRoute[];

	get basePath() {
		return this._basePath;
	}
	get routers() {
		return this._routers;
	}
}
