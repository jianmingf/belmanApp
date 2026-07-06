import { useEffect, useState } from "react";
import { apiClients } from "../api/client";
import type { CategoryDto } from "../api/generatedClient";

export function useCategories() {
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function loadCategories() {
        try {
            setLoading(true);
            setError(null);

            const data = await apiClients.categories.getCategories();
            setCategories(data);
        } catch (err) {
            console.error("Failed to load categories:", err);
            setError(
                err instanceof Error ? err.message : "Failed to load categories"
            );
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);

    return {
        categories,
        loading,
        error,
        reload: loadCategories,
    };
}