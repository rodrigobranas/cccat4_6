import PlaceOrder from "../../application/usecase/place_order/PlaceOrder";
import SimulateFreight from "../../application/usecase/simulate_freight/SimulateFreight";
import DefaultFreightCalculator from "../../domain/entity/DefaultFreightCalculator";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import PlaceOrderController from "../controller/PlaceOrderController";
import PgPromiseConnectionAdapter from "../database/PgPromiseConnectionAdapter";
import ItemRepositoryDatabase from "../repository/database/ItemRepositoryDatabase";
import Http from "./Http";

export default class RouteConfig {

	constructor (http: Http, repositoryFactory: RepositoryFactory) {

		http.on("/orders", "post", async function (params: any, body: any) {
			const placeOrderController = new PlaceOrderController(repositoryFactory);
			return placeOrderController.execute(params, body);
		});
		
		http.on("/simulateFreight", "post", async function (params: any, body: any) {
			const simulateFreight = new SimulateFreight(new ItemRepositoryDatabase(PgPromiseConnectionAdapter.getInstance()), new DefaultFreightCalculator());
			const input = body;
			return await simulateFreight.execute(input);
		});
	}
}