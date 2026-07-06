import { Clock3, Grid2X2, QrCode, Search } from "lucide-react";
import DispatchLogs from "../components/DispatchLogs";
import QuickActionCard from "../components/QuickActionCard";
import SearchBar from "../components/SearchBar";
import StatusOverview from "../components/StatusOverview";
import { dispatchLogs, workshopSearches } from "../data/mockData";

const quickActions = [
    {
        label: "Search Product",
        icon: <Search size={54} strokeWidth={2.6} />,
    },
    {
        label: "Scan QR Code",
        icon: <QrCode size={54} strokeWidth={2.6} />,
    },
    {
        label: "Browse Categories",
        icon: <Grid2X2 size={54} strokeWidth={2.6} />,
    },
    {
        label: "Warehouse Locator",
        icon: <Clock3 size={54} strokeWidth={2.6} />,
    },
];

export default function DashboardPage() {
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
                        Optimized for rapid hands-on picking in factory and warehouse conditions.
                    </p>
                </div>
            </section>

            <SearchBar />

            <section className="quick-grid">
                {quickActions.map((action) => (
                    <QuickActionCard
                        key={action.label}
                        icon={action.icon}
                        label={action.label}
                    />
                ))}
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

                <StatusOverview />
            </section>

            <DispatchLogs logs={dispatchLogs} />
        </>
    );
}