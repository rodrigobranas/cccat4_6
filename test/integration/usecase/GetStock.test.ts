import GetStock from "../../../src/application/usecase/get_stock/GetStock";
import SaveStock from "../../../src/application/usecase/save_stock/SaveStock";
import DatabaseRepositoryFactory from "../../../src/infra/factory/DatabaseRepositoryFactory";

test("Deve obter o estoque de um item", async function () {
	const repositoryFactory = new DatabaseRepositoryFactory();
	const stockEntryRepository = repositoryFactory.createStockEntryRepository();
	await stockEntryRepository.clear();
	const saveStock = new SaveStock(repositoryFactory);
	const saveStockInputa = {
		idItem: 1,
		operation: "in",
		quantity: 10
	};
	await saveStock.execute(saveStockInputa);
	const saveStockInputb = {
		idItem: 1,
		operation: "out",
		quantity: 5
	};
	await saveStock.execute(saveStockInputb);
	const getStock = new GetStock(repositoryFactory);
	const total = await getStock.execute(1);
	expect(total).toBe(5);
});
