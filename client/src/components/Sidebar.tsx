import {
    AlertTriangle,
    Grid2X2,
    Home,
    MapPin,
    Search,
} from "lucide-react";
import type { PageKey } from "../types";

type SidebarProps = {
    activePage: PageKey;
    onChangePage: (page: PageKey) => void;
};

const navItems = [
    {
        key: "dashboard",
        label: "Dashboard",
        icon: Home,
    },
    {
        key: "search",
        label: "Search",
        icon: Search,
    },
    {
        key: "categories",
        label: "Categories",
        icon: Grid2X2,
    },
    {
        key: "warehouse",
        label: "Warehouse",
        icon: MapPin,
    },
    {
        key: "alerts",
        label: "Alerts",
        icon: AlertTriangle,
    },
] as const;

export default function Sidebar({ activePage, onChangePage }: SidebarProps) {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
              
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.key}
                            className={
                                activePage === item.key
                                    ? "sidebar-item sidebar-item-active"
                                    : "sidebar-item"
                            }
                            onClick={() => onChangePage(item.key)}
                        >
                            <Icon size={24} />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}