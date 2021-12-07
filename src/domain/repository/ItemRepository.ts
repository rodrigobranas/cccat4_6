import Item from "../entity/Item";

export default interface ItemRepository {
	findById(idItem: number): Promise<Item | undefined>;
}
