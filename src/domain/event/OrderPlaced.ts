import DomainEvent from "../../infra/broker/DomainEvent";
import Order from "../entity/Order";

export default class OrderPlaced implements DomainEvent {
	name = "OrderPlaced";
	
	constructor (readonly order: Order) {
	}
}
