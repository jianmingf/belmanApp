import SearchBar from "../components/SearchBar";
import { products } from "../data/mockData";

export default function WarehousePage() {
    return (
        <>
            <section className="page-title-block">
                <h1>Warehouse Inventory Locator</h1>
                <p>
                    Lookup physical shelves and bins. Instantly transfer coordinates to
                    full-screen Picking Mode.
                </p>
            </section>

            <SearchBar placeholder="SEARCH PRODUCT, ZONE, SHELF OR BIN..." />

            <section className="warehouse-list">
                {products.map((product) => (
                    <article className="warehouse-card" key={product.reference}>
                        <div className="warehouse-product">
                            <p>
                                REF: <b>{product.reference}</b> • {product.category}
                            </p>
                            <h2>{product.name}</h2>
                            <span>
                Size: {product.size} • Pressure: {product.pressure}
              </span>
                        </div>

                        <div className="location-grid">
                            <div>
                                <span>ZONE</span>
                                <strong>{product.zone}</strong>
                            </div>
                            <div>
                                <span>SHELF</span>
                                <strong>{product.shelf}</strong>
                            </div>
                            <div>
                                <span>BIN</span>
                                <strong>{product.bin}</strong>
                            </div>
                            <div className="stock-location">
                                <span>STOCK</span>
                                <strong>{product.stock} pcs</strong>
                            </div>
                        </div>

                        <button className="blue-button">Open Picking View</button>
                    </article>
                ))}
            </section>
        </>
    );
}