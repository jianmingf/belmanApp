import { ClipboardList, Database, RotateCcw } from "lucide-react";
import logo from "../assets/logo.png";

export default function Header() {
    return (
        <header className="header">
            <div className="logo-image-wrap">
                <img src={logo} alt="Belman logo" className="logo-image" />
            </div>

            <div className="header-actions">
                <div className="mini-stats">
          <span>
            <Database size={13} /> DB: <b>9</b>
          </span>
                    <span>
            <RotateCcw size={13} /> Recent: <b>3</b>
          </span>
                    <span>
            <ClipboardList size={13} /> Requests: <b>1</b>
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