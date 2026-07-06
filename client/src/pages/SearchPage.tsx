import { useState } from "react";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import SearchBar from "../components/SearchBar";
import { useProducts } from "../hooks/useProducts";

const categories = [
    "Metal Expansion Joints",
    "Rubber Expansion Joints",
    "Fabric Expansion Joints",
    "Flexible Metal Hoses",
    "Piping Design Components",
    "On-site Service Parts",
];

const sizes = ["DN 50", "DN 100", "DN 150", "DN 250", "DN 400", "DN 600"];

const materials = [
    "Stainless Steel",
    "EPDM Rubber",
    "Fabric",
    "Nickel Alloy",
    "Graphite",
];

const pressures = ["PN 0.2", "PN 1.0", "PN 10", "PN 16", "PN 25", "PN 40"];

function ProductVisual({ categoryName }: { categoryName: string }) {
    const label = categoryName.includes("Metal")
        ? "METAL BELLOWS"
        : categoryName.includes("Rubber")
            ? "RUBBER JOINT"
            : categoryName.includes("Fabric")
                ? "FABRIC JOINT"
                : categoryName.includes("Hose")
                    ? "FLEX HOSE"
                    : "BELMAN PART";

    return (
        <div className="product-visual">
            <div className="product-visual-symbol">≋≋≋</div>
            <span>{label}</span>
        </div>
    );
}

export default function SearchPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState<string | undefined>();
    const [size, setSize] = useState<string | undefined>();
    const [material, setMaterial] = useState<string | undefined>();
    const [pressure, setPressure] = useState<string | undefined>();
    const [inStockOnly, setInStockOnly] = useState(false);

    const { products, loading, error } = useProducts({
        search,
        category,
        size,
        material,
        pressure,
        inStockOnly,
    });

    function resetFilters() {
        setSearch("");
        setCategory(undefined);
        setSize(undefined);
        setMaterial(undefined);
        setPressure(undefined);
        setInStockOnly(false);
    }

    return (
        <>
            <section className="page-title-block">
                <h1>Industrial Specification Search</h1>
                <p>
                    Match pipelines with precise expansion joints. Quick filtering for
                    heavy duty materials.
                </p>
            </section>

            <SearchBar
                placeholder="TYPE PRODUCT, DN SIZE, PRESSURE, OR MATERIAL..."
                value={search}
                onChange={setSearch}
            />

            <section className="filter-card">
                <div className="filter-header">
                    <h2>INDUSTRIAL FILTERS</h2>
                    <button onClick={resetFilters}>Reset Filters</button>
                </div>

                <div className="filter-group">
                    <h3>1. PRODUCT CATEGORY / TYPE</h3>

                    <div className="filter-buttons">
                        {categories.map((item) => (
                            <button
                                key={item}
                                className={category === item ? "selected" : ""}
                                onClick={() =>
                                    setCategory(category === item ? undefined : item)
                                }
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="filter-group">
                    <h3>2. STANDARD DN CONNECTION SIZE</h3>

                    <div className="filter-buttons">
                        {sizes.map((item) => (
                            <button
                                key={item}
                                className={size === item ? "selected" : ""}
                                onClick={() => setSize(size === item ? undefined : item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="filter-group">
                    <h3>3. CONSTRUCTION MATERIAL</h3>

                    <div className="filter-buttons">
                        {materials.map((item) => (
                            <button
                                key={item}
                                className={material === item ? "selected" : ""}
                                onClick={() =>
                                    setMaterial(material === item ? undefined : item)
                                }
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="filter-group">
                    <h3>4. NOMINAL PRESSURE</h3>

                    <div className="filter-buttons">
                        {pressures.map((item) => (
                            <button
                                key={item}
                                className={pressure === item ? "selected" : ""}
                                onClick={() =>
                                    setPressure(pressure === item ? undefined : item)
                                }
                            >
                                {item}
                            </button>
                        ))}

                        <button
                            className={inStockOnly ? "selected" : ""}
                            onClick={() => setInStockOnly((value) => !value)}
                        >
                            In Stock Only
                        </button>
                    </div>
                </div>
            </section>

            {loading && <LoadingState text="Loading products..." />}
            {error && <ErrorState message={error} />}

            {!loading && !error && (
                <section className="result-list">
                    <p className="result-count">Matching Components: {products.length}</p>

                    {products.length === 0 ? (
                        <section className="info-panel">
                            <strong>No products found</strong>
                            <p>Try changing the search text or reset the filters.</p>
                        </section>
                    ) : (
                        products.map((product) => (
                            <article className="product-result-card" key={product.id}>
                                <ProductVisual categoryName={product.categoryName} />

                                <div className="product-main">
                                    <p className="product-ref">
                    <span className="product-ref-badge">
                      {product.categoryName}
                    </span>
                                        REF: {product.reference}
                                    </p>

                                    <h2>{product.name}</h2>

                                    <div className="product-info-grid">
                                        <div className="product-info-box">
                                            <span>Size</span>
                                            <strong>{product.size}</strong>
                                        </div>

                                        <div className="product-info-box">
                                            <span>Material</span>
                                            <strong>{product.material}</strong>
                                        </div>

                                        <div className="product-info-box">
                                            <span>Pressure Range</span>
                                            <strong>{product.pressure}</strong>
                                        </div>

                                        <div className="product-info-box">
                                            <span>Operating Temp</span>
                                            <strong>{product.temperature}</strong>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={
                                        product.isLowInventory
                                            ? "product-stock product-stock-warning"
                                            : "product-stock"
                                    }
                                >
                                    <span>Stock State</span>
                                    <strong>{product.stockQuantity} units</strong>
                                </div>

                                <button className="blue-button">View Details →</button>
                            </article>
                        ))
                    )}
                </section>
            )}
        </>
    );
}