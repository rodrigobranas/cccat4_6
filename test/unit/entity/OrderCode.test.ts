import OrderCode from "../../../src/domain/entity/OrderCode"

test("Deve criar um código de pedido", function () {
	const date = new Date("2020-10-01");
	const sequence = 1;
	const orderCode = new OrderCode(date, sequence);
	const value = orderCode.value;
	expect(value).toBe("202000000001");
});
