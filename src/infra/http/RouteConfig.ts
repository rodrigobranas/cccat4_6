import ItemDAO from "../../application/dao/ItemDAO";
import OrderDAO from "../../application/dao/OrderDAO";
import SimulateFreight from "../../application/usecase/simulate_freight/SimulateFreight";
import ValidateCoupon from "../../application/usecase/validate_coupon/ValidateCoupon";
import DefaultFreightCalculator from "../../domain/entity/DefaultFreightCalculator";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import Broker from "../broker/Broker";
import GetItemsController from "../controller/GetItemsController";
import GetOrderController from "../controller/GetOrderController";
import GetOrdersController from "../controller/GetOrdersController";
import PlaceOrderController from "../controller/PlaceOrderController";
import PgPromiseConnectionAdapter from "../database/PgPromiseConnectionAdapter";
import CouponRepositoryDatabase from "../repository/database/CouponRepositoryDatabase";
import ItemRepositoryDatabase from "../repository/database/ItemRepositoryDatabase";
import Http from "./Http";

export default class RouteConfig {

	constructor (http: Http, repositoryFactory: RepositoryFactory, orderDAO: OrderDAO, broker: Broker, itemDAO: ItemDAO) {

		http.on("/orders", "post", async function (params: any, body: any) {
			const placeOrderController = new PlaceOrderController(repositoryFactory, broker);
			return placeOrderController.execute(params, body);
		});
		
		http.on("/simulateFreight", "post", async function (params: any, body: any) {
			const simulateFreight = new SimulateFreight(new ItemRepositoryDatabase(PgPromiseConnectionAdapter.getInstance()), new DefaultFreightCalculator());
			const input = body;
			return await simulateFreight.execute(input);
		});

		http.on("/validateCoupon", "post", async function (params: any, body: any) {
			const validateCoupon = new ValidateCoupon(new CouponRepositoryDatabase(PgPromiseConnectionAdapter.getInstance()));
			const input = body;
			return await validateCoupon.execute(input.coupon);
		});

		http.on("/orders", "get", async function (params: any, body: any) {
			const getOrdersController = new GetOrdersController(orderDAO);
			return getOrdersController.execute(params, body);
		});

		http.on("/orders/:code", "get", async function (params: any, body: any) {
			const getOrderController = new GetOrderController(orderDAO);
			return getOrderController.execute(params, body);
		});

		http.on("/items", "get", async function (params: any, body: any) {
			const getItemsController = new GetItemsController(itemDAO);
			return getItemsController.execute(params, body);
		});
	}
}
