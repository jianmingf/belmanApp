import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import AlertsPage from "./pages/AlertsPage";
import CategoriesPage from "./pages/CategoriesPage";
import DashboardPage from "./pages/DashboardPage";
import SearchPage from "./pages/SearchPage";
import WarehousePage from "./pages/WarehousePage";
import type { PageKey } from "./types";

export default function App() {
    const [activePage, setActivePage] = useState<PageKey>("dashboard");

    function renderPage() {
        switch (activePage) {
            case "dashboard":
                return <DashboardPage onChangePage={setActivePage} />;
            case "search":
                return <SearchPage />;
            case "categories":
                return <CategoriesPage />;
            case "warehouse":
                return <WarehousePage />;
            case "alerts":
                return <AlertsPage />;
            default:
                return <DashboardPage onChangePage={setActivePage} />;
        }
    }

    return (
        <Layout activePage={activePage} onChangePage={setActivePage}>
            {renderPage()}
        </Layout>
    );
}