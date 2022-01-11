import OrderDAODatabase from "./infra/dao/OrderDAODatabase";
import PgPromiseConnectionAdapter from "./infra/database/PgPromiseConnectionAdapter";
import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import RouteConfig from "./infra/http/RouteConfig";

const repositoryFactory = new DatabaseRepositoryFactory();
const connection = PgPromiseConnectionAdapter.getInstance();
const orderDAO = new OrderDAODatabase(connection);
const expressAdapter = new ExpressAdapter();
new RouteConfig(expressAdapter, repositoryFactory, orderDAO);
expressAdapter.listen(3000);
