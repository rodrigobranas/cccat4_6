import PgPromiseConnectionAdapter from "../../../src/infra/database/PgPromiseConnectionAdapter";

test("Deve criar uma conexão com o banco de dados", async function () {
	const connection = PgPromiseConnectionAdapter.getInstance();
	const itemsData = await connection.query("select * from ccca.item", []);
	expect(itemsData).toHaveLength(6);
});
