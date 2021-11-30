import Coupon from "../src/Coupon";
import Item from "../src/Item";
import Order from "../src/Order";

test("Deve criar um pedido vazio com CPF válido", function () {
	const cpf = "839.435.452-10";
	const order = new Order(cpf);
	const total = order.getTotal();
	expect(total).toBe(0);
});

test("Deve tentar criar um pedido vazio com CPF inválido", function () {
	const cpf = "111.111.111-11";
	expect(() => new Order(cpf)).toThrow(new Error("Invalid cpf"));
});

test("Deve criar um pedido com 3 itens", function () {
	const cpf = "839.435.452-10";
	const order = new Order(cpf);
	order.addItem(new Item(1, "Música", "CD", 30), 3);
	order.addItem(new Item(2, "Vídeo", "DVD", 50), 1);
	order.addItem(new Item(3, "Vídeo", "VHS", 10), 2);
	const total = order.getTotal();
	expect(total).toBe(160);
});

test("Deve criar um pedido com 3 itens com um cupom de desconto", function () {
	const cpf = "839.435.452-10";
	const order = new Order(cpf);
	order.addItem(new Item(1, "Música", "CD", 30), 3);
	order.addItem(new Item(2, "Vídeo", "DVD", 50), 1);
	order.addItem(new Item(3, "Vídeo", "VHS", 10), 2);
	order.addCoupon(new Coupon("VALE20", 20));
	const total = order.getTotal();
	expect(total).toBe(128);
});
