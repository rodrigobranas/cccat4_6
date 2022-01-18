import CouponRepository from "../repository/CouponRepository";
import ItemRepository from "../repository/ItemRepository";
import OrderRepository from "../repository/OrderRepository";
import StockEntryRepository from "../repository/StockEntryRepository";

export default interface RepositoryFactory {

	createItemRepository(): ItemRepository;
	createCouponRepository(): CouponRepository;
	createOrderRepository(): OrderRepository;
	createStockEntryRepository(): StockEntryRepository;
}