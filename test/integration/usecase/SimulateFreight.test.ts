import SimulateFreight from "../../../src/application/usecase/simulate_freight/SimulateFreight";
import SimulateFreightInput from "../../../src/application/usecase/simulate_freight/SimulateFreightInput";
import DefaultFreightCalculator from "../../../src/domain/entity/DefaultFreightCalculator";
import PgPromiseConnectionAdapter from "../../../src/infra/database/PgPromiseConnectionAdapter";
import ItemRepositoryDatabase from "../../../src/infra/repository/database/ItemRepositoryDatabase";

test("Deve simular o frete dos itens", async function () {
	const connection = PgPromiseConnectionAdapter.getInstance();
	const itemRepository = new ItemRepositoryDatabase(connection);
	const freightCalculator = new DefaultFreightCalculator();
	const simulateFreight = new SimulateFreight(itemRepository, freightCalculator);
	const input = new SimulateFreightInput([
		{
			idItem: 4,
			quantity: 1
		},
		{
			idItem: 5,
			quantity: 1
		},
		{
			idItem: 6,
			quantity: 3
		}
	]);
	const output = await simulateFreight.execute(input);
	expect(output.amount).toBe(260);
});
