import * as Hapi from "@hapi/hapi";
import Container, { Service } from "typedi";
import { HOST, PORT } from "./constants";
import { Router } from "./routes";
import logger from "./tools/logger";

@Service()
export class App {
	constructor() {
		this.server = Hapi.server({
			port: PORT,
			host: HOST,
		});
		Container.set("server", this.server);
		this.router = Container.get(Router);
	}

	private server: Hapi.Server;
	private router: Router;

	public async start() {
		await this.server.start();

		logger.info(`Server is running on ${this.server.info.uri}`);
	}
}
