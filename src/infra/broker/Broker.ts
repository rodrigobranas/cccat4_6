import DomainEvent from "./DomainEvent";
import Handler from "./Handler";

export default class Broker {
	handlers: Handler[];

	constructor () {
		this.handlers = [];
	}

	register (handler: Handler) {
		this.handlers.push(handler);
	}

	publish (event: DomainEvent) {
		for (const handler of this.handlers) {
			if (handler.name === event.name) {
				handler.handle(event);
			}
		}
	}
}
