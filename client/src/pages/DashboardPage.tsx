import { useState } from "react";
import { AlertTriangle, Clock3, Grid2X2, QrCode, Search } from "lucide-react";
import DispatchLogs from "../components/DispatchLogs";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import QrScannerModal from "../components/QrScannerModal";
import QuickActionCard from "../components/QuickActionCard";
import StatusOverview from "../components/StatusOverview";
import { useDashboard } from "../hooks/useDashboard";
import type { PageKey, SearchPreset } from "../types";

type DashboardPageProps = {
    onChangePage: (page: PageKey) => void;
    onSearchFromDashboard: (preset: SearchPreset) => void;
    onQrScanned: (value: string) => void;
};

const workshopSearches: {
    label: string;
    preset: SearchPreset;
}[] = [
    {
        label: "DN 100",
        preset: {
            search: "DN 100",
            size: "DN 100",
        },
    },
    {
        label: "Stainless Steel",
        preset: {
            search: "Stainless Steel",
            material: "Stainless Steel",
        },
    },
    {
        label: "Axial Expansion Joint",
        preset: {
            search: "Axial Expansion Joint",
            category: "Metal Expansion Joints",
        },
    },
    {
        label: "Rubber Expansion Joint",
        preset: {
            search: "",
            category: "Rubber Expansion Joints",
        },
    },
    {
        label: "Fabric Expansion Joint",
        preset: {
            search: "",
            category: "Fabric Expansion Joints",
        },
    },
    {
        label: "Urgent Replacement",
        preset: {
            search: "",
            inStockOnly: true,
        },
    },
];

export default function DashboardPage({
                                          onChangePage,
                                          onSearchFromDashboard,
                                          onQrScanned,
                                      }: DashboardPageProps) {
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
        setIsQrScannerOpen(false);
        onQrScanned(value);
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
                        {workshopSearches.map((item) => (
                            <button
                                key={item.label}
                                className={
                                    item.label === "Urgent Replacement" ? "tag active" : "tag"
                                }
                                type="button"
                                onClick={() => onSearchFromDashboard(item.preset)}
                            >
                                {item.label}
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
                                    type="button"
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