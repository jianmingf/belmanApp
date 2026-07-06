import { useState } from "react";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import SearchBar from "../components/SearchBar";
import { useWarehouse } from "../hooks/useWarehouse";

export default function WarehousePage() {
    const [search, setSearch] = useState("");
    const { items, loading, error, picking, lastPickResult, pickProduct } =
        useWarehouse(search);

    return (
        <>
            <section className="page-title-block">
                <h1>Warehouse Inventory Locator</h1>
                <p>
                    Lookup physical shelves and bins. Instantly transfer coordinates to
                    full-screen Picking Mode.
                </p>
            </section>

            <SearchBar
                placeholder="SEARCH PRODUCT, ZONE, SHELF OR BIN..."
                value={search}
                onChange={setSearch}
            />

            {lastPickResult && (
                <section className="info-panel">
                    <strong>{lastPickResult.success ? "Success" : "Failed"}</strong>
                    <p>{lastPickResult.message}</p>
                </section>
            )}

            {loading && <LoadingState text="Loading warehouse items..." />}
            {error && <ErrorState message={error} />}

            {!loading && !error && (
                <section className="warehouse-list">
                    {items.map((item) => (
                        <article className="warehouse-card" key={item.id}>
                            <div className="warehouse-product">
                                <p>
                                    REF: <b>{item.reference}</b> • {item.categoryName}
                                </p>

                                <h2>{item.name}</h2>

                                <span>
                  Size: {item.size} • Pressure: {item.pressure}
                </span>
                            </div>

                            <div className="location-grid">
                                <div>
                                    <span>ZONE</span>
                                    <strong>{item.zone}</strong>
                                </div>

                                <div>
                                    <span>SHELF</span>
                                    <strong>{item.shelf}</strong>
                                </div>

                                <div>
                                    <span>BIN</span>
                                    <strong>{item.bin}</strong>
                                </div>

                                <div className="stock-location">
                                    <span>STOCK</span>
                                    <strong>{item.stockQuantity} pcs</strong>
                                </div>
                            </div>

                            <button
                                className="blue-button"
                                disabled={picking || item.stockQuantity <= 0}
                                onClick={() => pickProduct(item.id, 1)}
                            >
                                {picking ? "Picking..." : "Pick 1"}
                            </button>
                        </article>
                    ))}
                </section>
            )}
        </>
    );
}