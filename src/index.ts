import { App } from "./app";
import logger from "./tools/logger";
import "reflect-metadata";
import Container from "typedi";

(async () => {
	const app = Container.get(App);

	app.start();

	process.on("unhandledRejection", (err) => {
		logger.error(err);
		process.exit(1);
	});
})();
