import * as Hapi from "@hapi/hapi";
import Container, { Service } from "typedi";
import { HOST, PORT } from "./constants";
import { Router } from "./routes";
import logger from "./tools/logger";

@Service()
export class App {
	constructor(private readonly router: Router) {
		this.server = Hapi.server({
			port: PORT,
			host: HOST,
		});

		Container.set("server", this.server);
	}

	private server: Hapi.Server;

	public async start() {
		await this.server.start();

		logger.info(`Server is running on ${this.server.info.uri}`);
	}
}
