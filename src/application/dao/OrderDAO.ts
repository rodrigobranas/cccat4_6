export default interface OrderDAO {
	get(code: string): Promise<any>;
	findAll(): Promise<any>;
}
