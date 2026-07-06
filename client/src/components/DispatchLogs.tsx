import type { DispatchDto } from "../api/generatedClient";

type DispatchLogsProps = {
    dispatches: DispatchDto[];
    onMarkReady: (id: string) => void;
};

function getStatusClass(status: string) {
    return status.toLowerCase().replace(" ", "-");
}

export default function DispatchLogs({
                                         dispatches,
                                         onMarkReady,
                                     }: DispatchLogsProps) {
    return (
        <section className="logs-card">
            <h2>ACTIVE WORKSHOP DISPATCH & LOGS</h2>

            {dispatches.length === 0 ? (
                <p className="empty-text">No dispatch requests found.</p>
            ) : (
                <div className="logs-list">
                    {dispatches.map((log) => (
                        <article className="log-item" key={log.id}>
                            <div className="log-main">
                                <div className="log-meta">
                  <span className={`status-badge ${getStatusClass(log.status)}`}>
                    {log.status}
                  </span>

                                    <span>{new Date(log.requestedAt).toLocaleString()}</span>
                                </div>

                                <h3>{log.productName}</h3>

                                <p>
                                    Order No: <b>{log.productReference}</b> • Requested by:{" "}
                                    <b>{log.requestedBy}</b> • {log.workshop}
                                </p>
                            </div>

                            {log.status !== "Completed" && (
                                <button
                                    className="ready-button"
                                    onClick={() => onMarkReady(log.id)}
                                >
                                    Mark Ready
                                </button>
                            )}
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}