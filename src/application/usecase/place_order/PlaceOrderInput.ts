export default class PlaceOrderInput {

	constructor (readonly cpf: string, readonly orderItems: { idItem: number, quantity: number }[], readonly date: Date, readonly coupon?: string) {
	}
}
