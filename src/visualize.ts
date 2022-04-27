import { OrderStatus } from "~/base/OrderStatus";
import { transitions } from "~/libraries/OrderStateMachine";
import StateMachine from "javascript-state-machine";
import { graphviz } from "node-graphviz";
import visualize from "javascript-state-machine/lib/visualize";
import fs from "fs";

const fsm = new StateMachine({
	init: OrderStatus.PENDING,
	transitions,
});

graphviz.circo(visualize(fsm), "svg").then((svg) => {
	fs.writeFileSync("OrderStateMachine.svg", svg);
	process.exit(0);
});
