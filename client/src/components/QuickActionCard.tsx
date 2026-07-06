import type { ReactNode } from "react";

type QuickActionCardProps = {
    icon: ReactNode;
    label: string;
    onClick?: () => void;
};

export default function QuickActionCard({
                                            icon,
                                            label,
                                            onClick,
                                        }: QuickActionCardProps) {
    return (
        <button className="quick-card" onClick={onClick}>
            <div className="quick-icon">{icon}</div>
            <span>{label}</span>
        </button>
    );
}