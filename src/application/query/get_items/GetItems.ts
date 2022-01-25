import ItemDAO from "../../dao/ItemDAO";

export default class GetItems {

	constructor (readonly itemDAO: ItemDAO) {
	}

	async execute () {
		return this.itemDAO.findAll();
	}
}
