import { API_BASE_URL } from "./baseUrl";
import {
    AlertsClient,
    CategoriesClient,
    DispatchesClient,
    ProductsClient,
    StatsClient,
    WarehouseClient,
} from "./generatedClient";

export const apiClients = {
    alerts: new AlertsClient(API_BASE_URL),
    categories: new CategoriesClient(API_BASE_URL),
    dispatches: new DispatchesClient(API_BASE_URL),
    products: new ProductsClient(API_BASE_URL),
    stats: new StatsClient(API_BASE_URL),
    warehouse: new WarehouseClient(API_BASE_URL),
};