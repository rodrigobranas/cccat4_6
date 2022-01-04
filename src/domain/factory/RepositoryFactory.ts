import CouponRepository from "../repository/CouponRepository";
import ItemRepository from "../repository/ItemRepository";
import OrderRepository from "../repository/OrderRepository";

export default interface RepositoryFactory {

	createItemRepository(): ItemRepository;
	createCouponRepository(): CouponRepository;
	createOrderRepository(): OrderRepository;
}
