import StockEntry from "../../../domain/entity/StockEntry";
import StockEntryRepository from "../../../domain/repository/StockEntryRepository";
import Connection from "../../database/Connection";

export default class StockEntryRepositoryDatabase implements StockEntryRepository {

	constructor (readonly connection: Connection) {
	}

	async getByIdItem(idItem: number): Promise<StockEntry[]> {
		const stockEntriesData = await this.connection.query("select * from ccca.stock_entry where id_item = $1", [idItem]);
		const stockEntries: StockEntry[] = [];
		for (const stockEntryData of stockEntriesData) {
			stockEntries.push(new StockEntry(stockEntryData.idItem, stockEntryData.operation, stockEntryData.quantity, new Date(stockEntryData.date)));
		}
		return stockEntries;
	}

	async save(stockEntry: StockEntry): Promise<void> {
		await this.connection.query("insert into ccca.stock_entry (id_item, operation, quantity, date) values ($1, $2, $3, $4)", [stockEntry.idItem, stockEntry.operation, stockEntry.quantity, stockEntry.date]);
	}

	async clear () {
		await this.connection.query("delete from ccca.stock_entry", []);
	}
}
