import { useState } from "react";
import "./App.css";
import Layout from "./components/Layout";
import AlertsPage from "./pages/AlertsPage";
import CategoriesPage from "./pages/CategoriesPage";
import DashboardPage from "./pages/DashboardPage";
import SearchPage from "./pages/SearchPage";
import WarehousePage from "./pages/WarehousePage";
import type { PageKey, SearchPreset } from "./types";

export default function App() {
    const [activePage, setActivePage] = useState<PageKey>("dashboard");
    const [scannedSearch, setScannedSearch] = useState("");

    const [searchPreset, setSearchPreset] = useState<SearchPreset>({
        search: "",
    });

    function handleChangePage(page: PageKey) {
        if (page === "search") {
            setScannedSearch("");
            setSearchPreset({ search: "" });
        }

        setActivePage(page);
    }

    function handleSearchFromDashboard(preset: SearchPreset) {
        setScannedSearch(preset.search);
        setSearchPreset(preset);
        setActivePage("search");
    }

    function handleQrScanned(value: string) {
        setScannedSearch(value);
        setSearchPreset({
            search: value,
        });
        setActivePage("search");
    }

    function renderPage() {
        switch (activePage) {
            case "dashboard":
                return (
                    <DashboardPage
                        onChangePage={handleChangePage}
                        onSearchFromDashboard={handleSearchFromDashboard}
                        onQrScanned={handleQrScanned}
                    />
                );

            case "search":
                return (
                    <SearchPage
                        initialSearch={scannedSearch}
                        initialPreset={searchPreset}
                    />
                );

            case "categories":
                return <CategoriesPage />;

            case "warehouse":
                return <WarehousePage />;

            case "alerts":
                return <AlertsPage />;

            default:
                return (
                    <DashboardPage
                        onChangePage={handleChangePage}
                        onSearchFromDashboard={handleSearchFromDashboard}
                        onQrScanned={handleQrScanned}
                    />
                );
        }
    }

    return (
        <Layout activePage={activePage} onChangePage={handleChangePage}>
            {renderPage()}
        </Layout>
    );
}