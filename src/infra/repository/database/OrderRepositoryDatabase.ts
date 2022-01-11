import Coupon from "../../../domain/entity/Coupon";
import DefaultFreightCalculator from "../../../domain/entity/DefaultFreightCalculator";
import Item from "../../../domain/entity/Item";
import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";
import Connection from "../../database/Connection";

export default class OrderRepositoryDatabase implements OrderRepository {

	constructor (readonly connection: Connection) {
	}

	async save(order: Order): Promise<void> {
		const [orderData] = await this.connection.query("insert into ccca.order (code, cpf, issue_date, freight, sequence, coupon, total) values ($1, $2, $3, $4, $5, $6, $7) returning  *", [order.getCode(), order.getCpf(), order.date, order.getFreight(), order.sequence, order.coupon?.code, order.getTotal()]);
		for (const orderItem of order.getOrderItems()) {
			await this.connection.query("insert into ccca.order_item (id_item, id_order, price, quantity) values ($1, $2, $3, $4)", [orderItem.idItem, orderData.id_order, orderItem.price, orderItem.quantity]);
		}
	}

	async get(code: string): Promise<Order> {
		const [orderData] = await this.connection.query("select * from ccca.order where code = $1", [code]);
		if (!orderData) throw new Error("Order not found");
		const order = new Order(orderData.cpf, orderData.issue_date, new DefaultFreightCalculator(), orderData.sequence);
		const orderItemsData = await this.connection.query("select * from ccca.order_item where id_order = $1", [orderData.id_order]);
		for (const orderItemData of orderItemsData) {
			const [itemData] = await this.connection.query("select * from ccca.item where id_item = $1", [orderItemData.id_item]);
			const item = new Item(itemData.id_item, itemData.category, itemData.description, parseFloat(orderItemData.price), itemData.width, itemData.height, itemData.length, itemData.weight);
			order.addItem(item, orderItemData.quantity);
		}
		if (orderData.coupon) {
			const [couponData] = await this.connection.query("select * from ccca.coupon where code = $1", [orderData.coupon]);
			const coupon = new Coupon(couponData.code, couponData.percentage, couponData.expire_date);
			order.addCoupon(coupon);
		}
		return order;
	}

	async findAll(): Promise<Order[]> {
		const orders: Order[] = [];
		const ordersData = await this.connection.query("select * from ccca.order", []);
		for (const orderData of ordersData) {
			const order = await this.get(orderData.code);
			orders.push(order);
		}
		return orders;
	}

	async count(): Promise<number> {
		const [orderData] = await this.connection.query("select count(*)::int as count from ccca.order", []);
		return orderData.count;
	}

	async clear(): Promise<void> {
		await this.connection.query("delete from ccca.order_item", []);
		await this.connection.query("delete from ccca.order", []);
	}
}
