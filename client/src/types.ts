export type PageKey =
    | "dashboard"
    | "search"
    | "categories"
    | "warehouse"
    | "alerts";

export type DispatchStatus = "Pending" | "In Progress" | "Completed";

export type DispatchLog = {
    status: DispatchStatus;
    time: string;
    product: string;
    orderNo: string;
    requestedBy: string;
};

export type Product = {
    reference: string;
    category: string;
    name: string;
    size: string;
    material: string;
    pressure: string;
    temperature: string;
    stock: number;
    zone: string;
    shelf: string;
    bin: string;
};