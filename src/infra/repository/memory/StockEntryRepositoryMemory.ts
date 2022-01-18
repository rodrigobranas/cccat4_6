import StockEntry from "../../../domain/entity/StockEntry";
import StockEntryRepository from "../../../domain/repository/StockEntryRepository";

export default class StockEntryRepositoryMemory implements StockEntryRepository {
	stockEntries: StockEntry[];

	constructor () {
		this.stockEntries = [];
	}

	async getByIdItem(idItem: number): Promise<StockEntry[]> {
		return this.stockEntries.filter(stockEntry => stockEntry.idItem === idItem);
	}

	async save(stockEntry: StockEntry): Promise<void> {
		this.stockEntries.push(stockEntry);
	}

	async clear () {
		this.stockEntries = [];
	}
}