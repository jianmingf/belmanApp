import type { DispatchLog, Product } from "../types";

export const dispatchLogs: DispatchLog[] = [
    {
        status: "Pending",
        time: "2026-07-05 14:32",
        product: "Axial Metal Expansion Joint DN100",
        orderNo: "BM-AX-100-16",
        requestedBy: "Markus (Workshop 3B)",
    },
    {
        status: "In Progress",
        time: "2026-07-05 11:15",
        product: "Gimbal Expansion Joint DN600",
        orderNo: "BM-GI-600-40",
        requestedBy: "Warehouse A Team",
    },
    {
        status: "Completed",
        time: "2026-07-04 16:45",
        product: "Rubber Expansion Joint DN150",
        orderNo: "BM-RU-150-16",
        requestedBy: "Service Tech Peter",
    },
];

export const workshopSearches = [
    "DN 100",
    "Stainless Steel",
    "Axial Expansion Joint",
    "Rubber Expansion Joint",
    "Fabric Expansion Joint",
    "Urgent Replacement",
];

export const products: Product[] = [
    {
        reference: "BM-AX-100-16",
        category: "Metal Expansion Joints",
        name: "Axial Metal Expansion Joint DN100",
        size: "DN 100",
        material: "Stainless Steel",
        pressure: "PN 16",
        temperature: "-20°C to +420°C",
        stock: 24,
        zone: "A",
        shelf: "02",
        bin: "08",
    },
    {
        reference: "BM-LA-250-10",
        category: "Metal Expansion Joints",
        name: "Lateral Expansion Joint DN250",
        size: "DN 250",
        material: "Stainless Steel",
        pressure: "PN 10",
        temperature: "-20°C to +400°C",
        stock: 8,
        zone: "B",
        shelf: "04",
        bin: "12",
    },
    {
        reference: "BM-RU-150-16",
        category: "Rubber Expansion Joints",
        name: "Rubber Expansion Joint DN150",
        size: "DN 150",
        material: "EPDM Rubber",
        pressure: "PN 16",
        temperature: "-35°C to +130°C",
        stock: 35,
        zone: "A",
        shelf: "08",
        bin: "22",
    },
];