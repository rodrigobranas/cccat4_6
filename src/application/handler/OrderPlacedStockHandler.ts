import StockEntry from "../../domain/entity/StockEntry";
import OrderPlaced from "../../domain/event/OrderPlaced";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import StockEntryRepository from "../../domain/repository/StockEntryRepository";
import Handler from "../../infra/broker/Handler";

export default class OrderPlacedStockHandler implements Handler {
	name = "OrderPlaced";
	stockEntryRepository: StockEntryRepository;

	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.stockEntryRepository = repositoryFactory.createStockEntryRepository();
	}

	handle(event: OrderPlaced): void {
		for (const orderItem of event.order.getOrderItems()) {
			this.stockEntryRepository.save(new StockEntry(orderItem.idItem, "out", orderItem.quantity, event.order.date));
		}
	}
}
