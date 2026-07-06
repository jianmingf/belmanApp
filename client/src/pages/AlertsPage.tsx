import { AlertTriangle, CheckCircle2 } from "lucide-react";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import { useAlerts } from "../hooks/useAlerts";

function unitText(quantity: number) {
    return quantity === 1 ? "unit left" : "units left";
}

function formatDate(value: string) {
    return new Date(value).toLocaleString();
}

export default function AlertsPage() {
    const { alerts, loading, resolving, error, resolveAlert } = useAlerts(true);

    if (loading) {
        return <LoadingState text="Loading inventory alerts..." />;
    }

    if (error) {
        return <ErrorState message={error} />;
    }

    return (
        <>
            <section className="page-title-block">
                <h1>Inventory Alerts</h1>
                <p>
                    Products below the 10% inventory limit are shown here for quick
                    warehouse action.
                </p>
            </section>

            {alerts.length === 0 ? (
                <section className="alerts-empty-card">
                    <div className="alerts-empty-icon">
                        <CheckCircle2 size={34} />
                    </div>

                    <div>
                        <p className="alerts-eyebrow">Inventory Status</p>
                        <h2>No Low Inventory Alerts</h2>
                        <p>
                            All products are currently above the low-stock alert limit.
                        </p>
                    </div>
                </section>
            ) : (
                <section className="alerts-page-card">
                    <div className="alerts-page-header">
                        <div className="alerts-page-icon">
                            <AlertTriangle size={30} />
                        </div>

                        <div>
                            <p className="alerts-eyebrow">Low Inventory</p>
                            <h2>{alerts.length} Products Need Attention</h2>
                            <p>
                                These products are below 10% stock and should be checked or
                                reordered.
                            </p>
                        </div>
                    </div>

                    <div className="alerts-summary-strip">
                        <div>
                            <span>Total Alerts</span>
                            <strong>{alerts.length}</strong>
                        </div>

                        <div>
                            <span>Lowest Stock</span>
                            <strong>
                                {Math.min(...alerts.map((alert) => alert.stockQuantity))} units
                            </strong>
                        </div>

                        <div>
                            <span>Alert Type</span>
                            <strong>Low Inventory</strong>
                        </div>
                    </div>

                    <div className="alerts-product-list">
                        {alerts.map((alert) => (
                            <article className="alerts-product-card" key={alert.id}>
                                <div className="alerts-product-main">
                                    <div className="alerts-product-topline">
                    <span className="alerts-severity">
                      {alert.severity}
                    </span>

                                        <span className="alerts-percent">
                      {alert.stockPercentage}% remaining
                    </span>
                                    </div>

                                    <h3>{alert.productName}</h3>

                                    <p>
                                        Ref: <b>{alert.productReference}</b>
                                    </p>

                                    <small>Created: {formatDate(alert.createdAt)}</small>
                                </div>

                                <div className="alerts-stock-box">
                                    <span>Only</span>
                                    <strong>
                                        {alert.stockQuantity} {unitText(alert.stockQuantity)}
                                    </strong>
                                    <p>Max stock: {alert.maxStock}</p>
                                </div>

                                <button
                                    className="alerts-resolve-button"
                                    disabled={resolving}
                                    onClick={() => resolveAlert(alert.id)}
                                >
                                    Resolve
                                </button>
                            </article>
                        ))}
                    </div>
                </section>
            )}
        </>
    );
}