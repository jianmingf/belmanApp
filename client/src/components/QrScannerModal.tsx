import { QrCode, X } from "lucide-react";

type QrScannerModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onScanSuccess?: (value: string) => void;
};

export default function QrScannerModal({
                                           isOpen,
                                           onClose,
                                           onScanSuccess,
                                       }: QrScannerModalProps) {
    if (!isOpen) {
        return null;
    }

    function handleSimulateScan() {
        const fakeProductReference = "BM-AX-100-16";

        onScanSuccess?.(fakeProductReference);
        onClose();
    }

    return (
        <div className="qr-modal-backdrop">
            <section className="qr-modal">
                <button className="qr-modal-close" onClick={onClose} type="button">
                    <X size={20} />
                </button>

                <h2>Industrial QR Code Scanner</h2>

                <p className="qr-modal-subtitle">
                    Align Belman component metal plaque barcode within frame
                </p>

                <div className="qr-scanner-frame">
                    <div className="qr-corner top-left" />
                    <div className="qr-corner top-right" />
                    <div className="qr-corner bottom-left" />
                    <div className="qr-corner bottom-right" />

                    <div className="qr-laser-line" />

                    <div className="qr-placeholder">
                        <QrCode size={46} />
                        <span>Ready to trigger</span>
                    </div>
                </div>

                <button
                    className="qr-simulate-button"
                    onClick={handleSimulateScan}
                    type="button"
                >
                    Simulate Laser Scan
                </button>

                <button className="qr-cancel-button" onClick={onClose} type="button">
                    Cancel Scanner
                </button>
            </section>
        </div>
    );
}