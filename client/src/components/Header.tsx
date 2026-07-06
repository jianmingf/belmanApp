import { AlertTriangle, ClipboardList, Database } from "lucide-react";
import logo from "../assets/logo.png";
import { useStats } from "../hooks/useStats";

export default function Header() {
    const { stats } = useStats();

    return (
        <header className="header">
            <div className="logo-image-wrap">
                <img src={logo} alt="Belman logo" className="logo-image" />
            </div>

            <div className="header-actions">
                <div className="mini-stats">
          <span>
            <Database size={13} /> DB: <b>{stats?.totalItems ?? "-"}</b>
          </span>

                    <span>
            <ClipboardList size={13} /> Requests:{" "}
                        <b>{stats?.pendingRequests ?? "-"}</b>
          </span>

                    <span>
            <AlertTriangle size={13} /> Alerts:{" "}
                        <b>{stats?.activeAlerts ?? "-"}</b>
          </span>
                </div>

                <button className="glove-button">
                    <span className="glove-icon">☝</span>
                    <span>
            GLOVE MODE
            <strong>DISABLED</strong>
          </span>
                </button>
            </div>
        </header>
    );
}