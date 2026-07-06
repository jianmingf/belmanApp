import type { ReactNode } from "react";
import type { PageKey } from "../types";
import Header from "./Header";
import Sidebar from "./Sidebar";

type LayoutProps = {
    activePage: PageKey;
    onChangePage: (page: PageKey) => void;
    children: ReactNode;
};

export default function Layout({
                                   activePage,
                                   onChangePage,
                                   children,
                               }: LayoutProps) {
    return (
        <div className="app-shell">
            <Sidebar activePage={activePage} onChangePage={onChangePage} />

            <div className="main-panel">
                <Header />
                <main className="page-content">{children}</main>
            </div>
        </div>
    );
}