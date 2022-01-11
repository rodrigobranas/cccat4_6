import OrderDAO from "../../application/dao/OrderDAO";
import GetOrders from "../../application/query/get_orders/GetOrders";

export default class GetOrdersController {

	constructor (readonly orderDAO: OrderDAO) {
	}

	async execute (params: any, body: any) {
		const getOrders = new GetOrders(this.orderDAO);
		const getOrdersOutput = await getOrders.execute();
		return getOrdersOutput;
	}
}
