import { useEffect, useState } from "react";
import { apiClients } from "../api/client";
import type { AlertDto } from "../api/generatedClient";

export function useAlerts(unresolvedOnly = true) {
    const [alerts, setAlerts] = useState<AlertDto[]>([]);
    const [loading, setLoading] = useState(true);
    const [resolving, setResolving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function loadAlerts() {
        try {
            setLoading(true);
            setError(null);

            const data = await apiClients.alerts.getAlerts(unresolvedOnly);
            setAlerts(data);
        } catch (err) {
            console.error("Failed to load alerts:", err);
            setError(err instanceof Error ? err.message : "Failed to load alerts");
        } finally {
            setLoading(false);
        }
    }

    async function resolveAlert(id: string) {
        try {
            setResolving(true);
            setError(null);

            await apiClients.alerts.resolveAlert(id);
            await loadAlerts();
        } catch (err) {
            console.error("Failed to resolve alert:", err);
            setError(err instanceof Error ? err.message : "Failed to resolve alert");
        } finally {
            setResolving(false);
        }
    }

    useEffect(() => {
        loadAlerts();
    }, [unresolvedOnly]);

    return {
        alerts,
        loading,
        resolving,
        error,
        reload: loadAlerts,
        resolveAlert,
    };
}