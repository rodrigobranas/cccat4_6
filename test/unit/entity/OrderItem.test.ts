import OrderItem from "../../../src/domain/entity/OrderItem";

test("Deve criar um item do pedido", function () {
	const orderItem = new OrderItem(1, 1000, 10);
	expect(orderItem.getTotal()).toBe(10000);
});
