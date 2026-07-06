import type { ReactNode } from "react";

type QuickActionCardProps = {
    icon: ReactNode;
    label: string;
};

export default function QuickActionCard({ icon, label }: QuickActionCardProps) {
    return (
        <button className="quick-card">
            <div className="quick-icon">{icon}</div>
            <span>{label}</span>
        </button>
    );
}