import "reflect-metadata";
import { App } from "./app";
import logger from "./tools/logger";

(async () => {
	const app = new App();

	app.start();

	process.on("unhandledRejection", (err) => {
		logger.error(err);
		process.exit(1);
	});
})();
