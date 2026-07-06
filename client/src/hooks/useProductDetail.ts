import { useEffect, useState } from "react";
import { apiClients } from "../api/client";
import type { ProductDto } from "../api/generatedClient";

export function useProductDetail(productId: string | null) {
    const [product, setProduct] = useState<ProductDto | null>(null);
    const [loading, setLoading] = useState(Boolean(productId));
    const [error, setError] = useState<string | null>(null);

    async function loadProduct() {
        if (!productId) {
            setProduct(null);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const data = await apiClients.products.getProductById(productId);
            setProduct(data);
        } catch (err) {
            console.error("Failed to load product detail:", err);
            setError(
                err instanceof Error ? err.message : "Failed to load product detail"
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadProduct();
    }, [productId]);

    return {
        product,
        loading,
        error,
        reload: loadProduct,
    };
}