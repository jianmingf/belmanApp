import type { DispatchLog } from "../types";

type DispatchLogsProps = {
    logs: DispatchLog[];
};

function StatusBadge({ status }: { status: DispatchLog["status"] }) {
    return (
        <span className={`status-badge ${status.toLowerCase().replace(" ", "-")}`}>
      {status}
    </span>
    );
}

export default function DispatchLogs({ logs }: DispatchLogsProps) {
    return (
        <section className="logs-card">
            <h2>ACTIVE WORKSHOP DISPATCH & LOGS</h2>

            <div className="logs-list">
                {logs.map((log) => (
                    <article className="log-item" key={log.orderNo}>
                        <div className="log-main">
                            <div className="log-meta">
                                <StatusBadge status={log.status} />
                                <span>{log.time}</span>
                            </div>

                            <h3>{log.product}</h3>

                            <p>
                                Order No: <b>{log.orderNo}</b> • Requested by:{" "}
                                <b>{log.requestedBy}</b>
                            </p>
                        </div>

                        {log.status === "Pending" && (
                            <button className="ready-button">Mark Ready</button>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}