type LoadingStateProps = {
    text?: string;
};

export default function LoadingState({
                                         text = "Loading data...",
                                     }: LoadingStateProps) {
    return <div className="state-card">{text}</div>;
}