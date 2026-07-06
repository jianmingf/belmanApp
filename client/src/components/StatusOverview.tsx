export default function StatusOverview() {
    return (
        <aside className="status-card">
            <h2>STATUS OVERVIEW</h2>

            <div className="status-row">
                <span>DB SYNC</span>
                <strong className="green">LIVE</strong>
            </div>

            <div className="status-row">
                <span>TOTAL ITEMS</span>
                <strong>9</strong>
            </div>

            <div className="status-row">
                <span>PENDING REQ</span>
                <strong className="yellow">01</strong>
            </div>

            <div className="status-row last">
                <span>WORKSHOP</span>
                <strong>W-08B</strong>
            </div>
        </aside>
    );
}