import { useEffect, useState } from "react";
import { apiClients } from "../api/client";
import type { DashboardStatsDto } from "../api/generatedClient";

export function useStats() {
    const [stats, setStats] = useState<DashboardStatsDto | null>(null);

    async function loadStats() {
        try {
            const data = await apiClients.stats.getStats();
            setStats(data);
        } catch (error) {
            console.error("Failed to load header stats:", error);
        }
    }

    useEffect(() => {
        loadStats();
    }, []);

    return {
        stats,
        reload: loadStats,
    };
}