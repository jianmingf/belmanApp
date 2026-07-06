import { useState } from "react";
import { AlertTriangle, Clock3, Grid2X2, QrCode, Search } from "lucide-react";
import DispatchLogs from "../components/DispatchLogs";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import QrScannerModal from "../components/QrScannerModal";
import QuickActionCard from "../components/QuickActionCard";
import SearchBar from "../components/SearchBar";
import StatusOverview from "../components/StatusOverview";
import { useDashboard } from "../hooks/useDashboard";
import type { PageKey } from "../types";

type DashboardPageProps = {
    onChangePage: (page: PageKey) => void;
};

const workshopSearches = [
    "DN 100",
    "Stainless Steel",
    "Axial Expansion Joint",
    "Rubber Expansion Joint",
    "Fabric Expansion Joint",
    "Urgent Replacement",
];

export default function DashboardPage({ onChangePage }: DashboardPageProps) {
    const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);

    const {
        stats,
        dispatches,
        alerts,
        loading,
        error,
        markReady,
        resolveAlert,
    } = useDashboard();

    function handleQrScanSuccess(value: string) {
        console.log("Scanned QR value:", value);

        /*
          Later you can use this value to search or open product detail.
    
          Recommended QR content:
          BM-AX-100-16
          BM-FA-800-02
          prod-ax-100
        */

        setIsQrScannerOpen(false);
    }

    if (loading) {
        return <LoadingState text="Loading dashboard..." />;
    }

    if (error) {
        return <ErrorState message={error} />;
    }

    return (
        <>
            <section className="hero-card">
                <div className="hero-content">
                    <p className="eyebrow">WORKSHOP UTILITY</p>

                    <h1>BELMAN PRODUCT FINDER</h1>

                    <p className="hero-text">
                        Quickly lookup expansion joints, flexible connectors, or technical
                        dimensions.
                        <br />
                        Optimized for rapid hands-on picking in factory and warehouse
                        conditions.
                    </p>
                </div>
            </section>

            <SearchBar />

            <section className="quick-grid">
                <QuickActionCard
                    label="Search Product"
                    icon={<Search size={54} strokeWidth={2.6} />}
                    onClick={() => onChangePage("search")}
                />

                <QuickActionCard
                    label="Scan QR Code"
                    icon={<QrCode size={54} strokeWidth={2.6} />}
                    onClick={() => setIsQrScannerOpen(true)}
                />

                <QuickActionCard
                    label="Browse Categories"
                    icon={<Grid2X2 size={54} strokeWidth={2.6} />}
                    onClick={() => onChangePage("categories")}
                />

                <QuickActionCard
                    label="Warehouse Locator"
                    icon={<Clock3 size={54} strokeWidth={2.6} />}
                    onClick={() => onChangePage("warehouse")}
                />
            </section>

            <section className="middle-grid">
                <div className="workshop-card">
                    <h2>COMMON WORKSHOP SEARCHES</h2>

                    <div className="tag-grid">
                        {workshopSearches.map((tag) => (
                            <button
                                key={tag}
                                className={tag === "Urgent Replacement" ? "tag active" : "tag"}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                <StatusOverview stats={stats} />
            </section>

            {alerts.length > 0 && (
                <section className="logs-card">
                    <h2>LOW INVENTORY ALERTS</h2>

                    <div className="logs-list">
                        {alerts.slice(0, 3).map((alert) => (
                            <article className="log-item" key={alert.id}>
                                <div className="log-main">
                                    <div className="log-meta">
                    <span className="status-badge pending">
                      <AlertTriangle size={12} />
                        {alert.severity}
                    </span>

                                        <span>{alert.stockPercentage}% stock</span>
                                    </div>

                                    <h3>{alert.productName}</h3>

                                    <p>
                                        {alert.message} • Current stock:{" "}
                                        <b>{alert.stockQuantity}</b> / {alert.maxStock}
                                    </p>
                                </div>

                                <button
                                    className="ready-button"
                                    onClick={() => resolveAlert(alert.id)}
                                >
                                    Resolve
                                </button>
                            </article>
                        ))}
                    </div>
                </section>
            )}

            <DispatchLogs dispatches={dispatches} onMarkReady={markReady} />

            <QrScannerModal
                isOpen={isQrScannerOpen}
                onClose={() => setIsQrScannerOpen(false)}
                onScanSuccess={handleQrScanSuccess}
            />
        </>
    );
}