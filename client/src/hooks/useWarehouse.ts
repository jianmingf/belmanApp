import { useEffect, useState } from "react";
import { apiClients } from "../api/client";
import type {
    PickRequestDto,
    PickResultDto,
    WarehouseItemDto,
} from "../api/generatedClient";

export function useWarehouse(search?: string) {
    const [items, setItems] = useState<WarehouseItemDto[]>([]);
    const [lastPickResult, setLastPickResult] = useState<PickResultDto | null>(
        null
    );

    const [loading, setLoading] = useState(true);
    const [picking, setPicking] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function loadWarehouse() {
        try {
            setLoading(true);
            setError(null);

            const data = await apiClients.warehouse.getWarehouseItems(search ?? null);
            setItems(data);
        } catch (err) {
            console.error("Failed to load warehouse:", err);
            setError(err instanceof Error ? err.message : "Failed to load warehouse");
        } finally {
            setLoading(false);
        }
    }

    async function pickProduct(productId: string, quantity: number) {
        try {
            setPicking(true);
            setError(null);
            setLastPickResult(null);

            const request: PickRequestDto = {
                quantity,
            };

            const result = await apiClients.warehouse.pickProduct(productId, request);

            setLastPickResult(result);
            await loadWarehouse();

            return result;
        } catch (err) {
            console.error("Failed to pick product:", err);
            setError(err instanceof Error ? err.message : "Failed to pick product");
            return null;
        } finally {
            setPicking(false);
        }
    }

    useEffect(() => {
        loadWarehouse();
    }, [search]);

    return {
        items,
        lastPickResult,
        loading,
        picking,
        error,
        reload: loadWarehouse,
        pickProduct,
    };
}