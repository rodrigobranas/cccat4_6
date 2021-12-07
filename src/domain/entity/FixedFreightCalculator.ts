import FreightCalculator from "./FreightCalculator";
import Item from "./Item";

export default class FixedFreightCalculator implements FreightCalculator {
	calculate(item: Item): number {
		return 10;
	}
}
