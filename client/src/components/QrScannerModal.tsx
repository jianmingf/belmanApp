import { useEffect, useRef, useState } from "react";
import { QrCode, X } from "lucide-react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

type QrScannerModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onScanSuccess: (value: string) => void;
};

const QR_READER_ID = "belman-qr-reader";

export default function QrScannerModal({
                                           isOpen,
                                           onClose,
                                           onScanSuccess,
                                       }: QrScannerModalProps) {
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const isRunningRef = useRef(false);
    const hasScannedRef = useRef(false);

    const [isCameraRunning, setIsCameraRunning] = useState(false);
    const [cameraError, setCameraError] = useState<string | null>(null);

    async function stopCamera() {
        const scanner = scannerRef.current;

        if (!scanner) {
            return;
        }

        try {
            if (isRunningRef.current) {
                await scanner.stop();
            }
        } catch {
            // Ignore stop error if camera is already stopped
        }

        try {
            scanner.clear();
        } catch {
            // Ignore clear error
        }

        scannerRef.current = null;
        isRunningRef.current = false;
        setIsCameraRunning(false);
    }

    async function startCamera() {
        try {
            setCameraError(null);
            setIsCameraRunning(false);
            hasScannedRef.current = false;

            if (scannerRef.current) {
                return;
            }

            const scanner = new Html5Qrcode(QR_READER_ID, {
                formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
                verbose: false,
            });

            scannerRef.current = scanner;

            await scanner.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: {
                        width: 220,
                        height: 220,
                    },
                    aspectRatio: 1,
                },
                async (decodedText) => {
                    if (hasScannedRef.current) {
                        return;
                    }

                    const value = decodedText.trim();

                    if (!value) {
                        return;
                    }

                    hasScannedRef.current = true;

                    await stopCamera();
                    onScanSuccess(value);
                },
                () => {
                    // Ignore normal scanning noise
                }
            );

            isRunningRef.current = true;
            setIsCameraRunning(true);
        } catch (error) {
            console.error("Camera scanner error:", error);

            setCameraError(
                error instanceof Error
                    ? error.message
                    : "Could not start camera scanner."
            );
        }
    }

    async function handleClose() {
        await stopCamera();
        onClose();
    }

    async function handleSimulateScan() {
        await stopCamera();

        // This should match one product reference in your database
        onScanSuccess("BM-AX-100-16");
    }

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const timer = window.setTimeout(() => {
            void startCamera();
        }, 100);

        return () => {
            window.clearTimeout(timer);
            void stopCamera();
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className="qr-modal-backdrop">
            <section className="qr-modal">
                <button
                    className="qr-modal-close"
                    onClick={() => void handleClose()}
                    type="button"
                >
                    <X size={20} />
                </button>

                <h2>Industrial QR Code Scanner</h2>

                <p className="qr-modal-subtitle">
                    Align Belman component metal plaque barcode within frame
                </p>

                <div className="qr-scanner-frame">
                    <div id={QR_READER_ID} className="qr-camera-live" />

                    <div className="qr-corner top-left" />
                    <div className="qr-corner top-right" />
                    <div className="qr-corner bottom-left" />
                    <div className="qr-corner bottom-right" />

                    <div className="qr-laser-line" />

                    {!isCameraRunning && (
                        <div className="qr-placeholder">
                            <QrCode size={46} />
                            <span>
                {cameraError ? "Camera unavailable" : "Opening camera..."}
              </span>
                        </div>
                    )}
                </div>

                {cameraError && (
                    <p className="qr-error-text">
                        {cameraError}. Please allow camera permission or use simulate scan.
                    </p>
                )}

                <button
                    className="qr-simulate-button"
                    onClick={() => void handleSimulateScan()}
                    type="button"
                >
                    Simulate Laser Scan
                </button>

                <button
                    className="qr-cancel-button"
                    onClick={() => void handleClose()}
                    type="button"
                >
                    Cancel Scanner
                </button>
            </section>
        </div>
    );
}