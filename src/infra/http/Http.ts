export default interface Http {
	on (url: string, method: string, fn: any): void;
	listen (port: number): void;
}
