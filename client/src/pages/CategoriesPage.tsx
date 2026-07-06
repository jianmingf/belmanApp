import { Boxes, Cable, Layers, Radio, ShieldCheck, Wrench } from "lucide-react";

const categories = [
    {
        title: "Metal Expansion Joints",
        specs: "4 SPECS",
        icon: Layers,
        text: "Bellows made of stainless steel or high-nickel alloys to absorb thermal expansions in pipes.",
    },
    {
        title: "Rubber Expansion Joints",
        specs: "1 SPEC",
        icon: Radio,
        text: "Elastomer expansion joints with vibration reduction for pumps and cooling water systems.",
    },
    {
        title: "Fabric Expansion Joints",
        specs: "1 SPEC",
        icon: Boxes,
        text: "Multi-layer composite fabric bellows designed for gas ducts and low pressure systems.",
    },
    {
        title: "Flexible Metal Hoses",
        specs: "1 SPEC",
        icon: Cable,
        text: "Braided stainless steel hoses with multiple fittings for pressure and vacuum networks.",
    },
    {
        title: "Piping Design Components",
        specs: "1 SPEC",
        icon: Wrench,
        text: "Specialty piping connectors, custom flanges, and rectangular duct bellows.",
    },
    {
        title: "On-site Service Parts",
        specs: "1 SPEC",
        icon: ShieldCheck,
        text: "Gaskets, bolts, installation clamps, and service kits for workshop maintenance.",
    },
];

export default function CategoriesPage() {
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
                    const Icon = category.icon;

                    return (
                        <article className="category-card" key={category.title}>
                            <div className="category-top">
                                <div className="category-icon">
                                    <Icon size={30} />
                                </div>
                                <span>{category.specs}</span>
                            </div>

                            <h2>{category.title}</h2>
                            <p>{category.text}</p>

                            <button className="blue-button">
                                Browse {category.title}
                            </button>
                        </article>
                    );
                })}
            </section>
        </>
    );
}