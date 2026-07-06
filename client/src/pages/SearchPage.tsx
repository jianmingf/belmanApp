import SearchBar from "../components/SearchBar";
import { products } from "../data/mockData";

export default function SearchPage() {
    return (
        <>
            <section className="page-title-block">
                <h1>Industrial Specification Search</h1>
                <p>
                    Match pipelines with precise expansion joints. Quick filtering for
                    heavy duty materials.
                </p>
            </section>

            <SearchBar placeholder="TYPE PRODUCT, DN SIZE, PRESSURE, OR MATERIAL..." />

            <section className="filter-card">
                <div className="filter-header">
                    <h2>INDUSTRIAL FILTERS</h2>
                    <button>Reset Filters</button>
                </div>

                <div className="filter-group">
                    <h3>1. PRODUCT CATEGORY / TYPE</h3>
                    <div className="filter-buttons">
                        <button>Metal Expansion Joints</button>
                        <button className="selected">Rubber Expansion Joints</button>
                        <button>Fabric Expansion Joints</button>
                        <button>Flexible Metal Hoses</button>
                        <button>Piping Design Components</button>
                    </div>
                </div>

                <div className="filter-group">
                    <h3>2. STANDARD DN CONNECTION SIZE</h3>
                    <div className="filter-buttons">
                        <button>DN 50</button>
                        <button>DN 100</button>
                        <button>DN 150</button>
                        <button>DN 250</button>
                        <button>DN 400</button>
                        <button>DN 600</button>
                    </div>
                </div>
            </section>

            <section className="result-list">
                {products.map((product) => (
                    <article className="product-result-card" key={product.reference}>
                        <div>
                            <p className="product-ref">
                                {product.category} REF: {product.reference}
                            </p>
                            <h2>{product.name}</h2>
                            <p>
                                {product.size} • {product.material} • {product.pressure}
                            </p>
                        </div>

                        <div className="stock-box">
                            <span>STOCK</span>
                            <strong>{product.stock} pcs</strong>
                        </div>

                        <button className="blue-button">View Details</button>
                    </article>
                ))}
            </section>
        </>
    );
}