import { products } from "../data/mockData";

export default function RecentPage() {
    return (
        <>
            <section className="page-title-block">
                <h1>Recent Products</h1>
                <p>Quick access to recently viewed workshop products.</p>
            </section>

            <section className="result-list">
                {products.slice(0, 3).map((product) => (
                    <article className="product-result-card" key={product.reference}>
                        <div>
                            <p className="product-ref">Recently viewed</p>
                            <h2>{product.name}</h2>
                            <p>
                                {product.reference} • {product.size} • {product.pressure}
                            </p>
                        </div>

                        <button className="blue-button">Open Product</button>
                    </article>
                ))}
            </section>
        </>
    );
}