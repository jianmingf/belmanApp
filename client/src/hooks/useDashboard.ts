import { useEffect, useState } from "react";
import { apiClients } from "../api/client";
import type {
    AlertDto,
    DashboardStatsDto,
    DispatchDto,
} from "../api/generatedClient";

export function useDashboard() {
    const [stats, setStats] = useState<DashboardStatsDto | null>(null);
    const [dispatches, setDispatches] = useState<DispatchDto[]>([]);
    const [alerts, setAlerts] = useState<AlertDto[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function loadDashboard() {
        try {
            setLoading(true);
            setError(null);

            const [statsData, dispatchData, alertData] = await Promise.all([
                apiClients.stats.getStats(),
                apiClients.dispatches.getDispatches(),
                apiClients.alerts.getAlerts(true),
            ]);

            setStats(statsData);
            setDispatches(dispatchData);
            setAlerts(alertData);
        } catch (err) {
            console.error("Failed to load dashboard:", err);
            setError(
                err instanceof Error ? err.message : "Failed to load dashboard data"
            );
        } finally {
            setLoading(false);
        }
    }

    async function markReady(id: string) {
        try {
            setError(null);
            await apiClients.dispatches.markReady(id);
            await loadDashboard();
        } catch (err) {
            console.error("Failed to mark dispatch ready:", err);
            setError(
                err instanceof Error ? err.message : "Failed to mark dispatch as ready"
            );
        }
    }

    async function resolveAlert(id: string) {
        try {
            setError(null);
            await apiClients.alerts.resolveAlert(id);
            await loadDashboard();
        } catch (err) {
            console.error("Failed to resolve alert:", err);
            setError(err instanceof Error ? err.message : "Failed to resolve alert");
        }
    }

    useEffect(() => {
        loadDashboard();
    }, []);

    return {
        stats,
        dispatches,
        alerts,
        loading,
        error,
        reload: loadDashboard,
        markReady,
        resolveAlert,
    };
}