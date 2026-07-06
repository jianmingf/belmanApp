import { useEffect, useState } from "react";
import { apiClients } from "../api/client";
import type { DispatchDto } from "../api/generatedClient";

export function useDispatches() {
    const [dispatches, setDispatches] = useState<DispatchDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function loadDispatches() {
        try {
            setLoading(true);
            setError(null);

            const data = await apiClients.dispatches.getDispatches();
            setDispatches(data);
        } catch (err) {
            console.error("Failed to load dispatches:", err);
            setError(
                err instanceof Error ? err.message : "Failed to load dispatches"
            );
        } finally {
            setLoading(false);
        }
    }

    async function markReady(id: string) {
        try {
            setUpdating(true);
            setError(null);

            await apiClients.dispatches.markReady(id);
            await loadDispatches();
        } catch (err) {
            console.error("Failed to mark dispatch ready:", err);
            setError(
                err instanceof Error ? err.message : "Failed to mark dispatch ready"
            );
        } finally {
            setUpdating(false);
        }
    }

    useEffect(() => {
        loadDispatches();
    }, []);

    return {
        dispatches,
        loading,
        updating,
        error,
        reload: loadDispatches,
        markReady,
    };
}