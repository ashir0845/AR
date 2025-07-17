import { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const QRScanner = ({ onScanSuccess }) => {
  const readerId = 'html5qr-reader';
  const scannerRef = useRef(null);
  const isScanning = useRef(false);

  useEffect(() => {
    const scanner = new Html5Qrcode(readerId);
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          console.log('✅ QR Code Scanned:', decodedText);
          if (isScanning.current) {
            isScanning.current = false;
            scanner
              .stop()
              .then(() => {
                document.getElementById(readerId).innerHTML = ''; // clear camera view
                onScanSuccess(decodedText);
              })
              .catch((err) => console.error('Stop error:', err));
          }
        },
        (errorMessage) => {
          // Scan errors — not critical
        }
      )
      .then(() => {
        isScanning.current = true;
      })
      .catch((err) => {
        console.error('❌ Camera start error:', err);
      });

    // Cleanup on unmount
    return () => {
      if (isScanning.current) {
        scanner
          .stop()
          .then(() => {
            document.getElementById(readerId).innerHTML = '';
          })
          .catch(() => {});
      }
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto my-6">
      <div
        id={readerId}
        className="border rounded-xl shadow"
        style={{ width: '100%', height: '320px' }}
      ></div>
    </div>
  );
};

export default QRScanner;
