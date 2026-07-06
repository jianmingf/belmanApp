import {
    Boxes,
    Cable,
    Layers,
    Radio,
    ShieldCheck,
    Wrench,
} from "lucide-react";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import { useCategories } from "../hooks/useCategories";

function getCategoryIcon(name: string) {
    if (name.includes("Metal")) return Layers;
    if (name.includes("Rubber")) return Radio;
    if (name.includes("Fabric")) return Boxes;
    if (name.includes("Hose")) return Cable;
    if (name.includes("Piping")) return Wrench;
    return ShieldCheck;
}

export default function CategoriesPage() {
    const { categories, loading, error } = useCategories();

    if (loading) {
        return <LoadingState text="Loading categories..." />;
    }

    if (error) {
        return <ErrorState message={error} />;
    }

    return (
        <>
            <section className="page-title-block">
                <h1>Product Categories</h1>
                <p>
                    Select an industrial segment below to browse specific expansion
                    bellows and joint dimensions.
                </p>
            </section>

            <section className="category-grid">
                {categories.map((category) => {
                    const Icon = getCategoryIcon(category.name);

                    return (
                        <article className="category-card" key={category.id}>
                            <div className="category-top">
                                <div className="category-icon">
                                    <Icon size={30} />
                                </div>

                                <span className="category-count">
                                    {category.productCount}{" "}
                                    {category.productCount === 1 ? "PRODUCT" : "PRODUCTS"}
                                </span>
                            </div>

                            <h2 className="category-title">{category.name}</h2>
                            <p className="category-description">{category.description}</p>

                            <button className="category-button">
                                Browse {category.name}
                            </button>
                        </article>
                    );
                })}
            </section>

            {/*<section className="info-panel">
                <strong>Logistics Standards Compliant</strong>
                <p>
                    Categories correspond to Belman industrial product segments and
                    warehouse picking workflows.
                </p>
            </section>*/}
        </>
    );
}