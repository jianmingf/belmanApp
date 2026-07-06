import type { DashboardStatsDto } from "../api/generatedClient";

type StatusOverviewProps = {
    stats: DashboardStatsDto | null;
};

export default function StatusOverview({ stats }: StatusOverviewProps) {
    return (
        <aside className="status-card">
            <h2>STATUS OVERVIEW</h2>

            <div className="status-row">
                <span>DB SYNC</span>
                <strong className="green">{stats?.dbSync ?? "-"}</strong>
            </div>

            <div className="status-row">
                <span>TOTAL ITEMS</span>
                <strong>{stats?.totalItems ?? "-"}</strong>
            </div>

            <div className="status-row">
                <span>PENDING REQ</span>
                <strong className="yellow">{stats?.pendingRequests ?? "-"}</strong>
            </div>

            <div className="status-row">
                <span>ACTIVE ALERTS</span>
                <strong className="yellow">{stats?.activeAlerts ?? "-"}</strong>
            </div>

            <div className="status-row last">
                <span>WORKSHOP</span>
                <strong>{stats?.workshop ?? "W-08B"}</strong>
            </div>
        </aside>
    );
}