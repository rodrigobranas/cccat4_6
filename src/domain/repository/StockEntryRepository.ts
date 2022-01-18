import StockEntry from "../entity/StockEntry";

export default interface StockEntryRepository {
	getByIdItem(idItem: number): Promise<StockEntry[]>;
	save(stockEntry: StockEntry): Promise<void>;
	clear(): Promise<void>;
}
