import Connection from "./Connection";
import pgp from "pg-promise";

export default class PgPromiseConnectionAdapter implements Connection {
	pgp: any;
	static instance: PgPromiseConnectionAdapter;

	private constructor () {
		this.pgp = pgp()("postgres://postgres:123456@localhost:5432/app");
	}

	static getInstance () {
		if (!PgPromiseConnectionAdapter.instance) {
			PgPromiseConnectionAdapter.instance = new PgPromiseConnectionAdapter();
		}
		return PgPromiseConnectionAdapter.instance;
	}

	async query(statement: string, params: any[]): Promise<any> {
		return this.pgp.query(statement, params);
	}
}
