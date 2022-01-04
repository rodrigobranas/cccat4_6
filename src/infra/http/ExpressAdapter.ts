import express from "express";
import Http from "./Http";

export default class ExpressAdapter implements Http {
	app: any;
	
	constructor () {
		this.app = express();
		this.app.use(express.json());
	}

	on(url: string, method: string, fn: any): void {
		this.app[method](url, async function (req: any, res: any) {
			const output = await fn(req.params, req.body);
			res.json(output);
		});
	}

	listen(port: number): void {
		this.app.listen(port);
	}

}