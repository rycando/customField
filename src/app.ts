import * as Hapi from "@hapi/hapi";
import { HOST, PORT } from "./constants";
import { Router } from "./routes";
import logger from "./tools/logger";
import { container } from "tsyringe";

export class App {
	constructor() {
		this.server = Hapi.server({
			port: PORT,
			host: HOST,
		});
		container.register<Hapi.Server>("server", { useValue: this.server });
		this.router = container.resolve(Router);
	}

	private server: Hapi.Server;
	private router: Router;

	public async start() {
		await this.server.start();

		logger.info(`Server is running on ${this.server.info.uri}`);
	}
}
