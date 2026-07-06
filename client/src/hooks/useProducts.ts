import { useEffect, useState } from "react";
import { apiClients } from "../api/client";
import type { ProductDto } from "../api/generatedClient";

export type ProductFilters = {
    search?: string;
    categoryId?: string;
    category?: string;
    size?: string;
    material?: string;
    pressure?: string;
    inStockOnly?: boolean;
};

export function useProducts(filters: ProductFilters = {}) {
    const [products, setProducts] = useState<ProductDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function loadProducts() {
        try {
            setLoading(true);
            setError(null);

            const data = await apiClients.products.getProducts(
                filters.search ?? null,
                filters.categoryId ?? null,
                filters.category ?? null,
                filters.size ?? null,
                filters.material ?? null,
                filters.pressure ?? null,
                filters.inStockOnly ?? false
            );

            setProducts(data);
        } catch (err) {
            console.error("Failed to load products:", err);
            setError(err instanceof Error ? err.message : "Failed to load products");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadProducts();
    }, [
        filters.search,
        filters.categoryId,
        filters.category,
        filters.size,
        filters.material,
        filters.pressure,
        filters.inStockOnly,
    ]);

    return {
        products,
        loading,
        error,
        reload: loadProducts,
    };
}