import { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import ARViewer from "./components/ARviewer.jsx";
import QRScanner from "./components/QRscanner";

function App() {
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [analytics, setAnalytics] = useState({ total: 0, avgTimeSpent: 0 });

  const [qrContent, setQrContent] = useState(null);

  const handleScanSuccess = async (decodedText) => {
    setQrContent(decodedText); // 🔑 Save model URL
    setShowScanner(false);
    setScanned(true);

    // Record scan
    const timeSpent = Math.floor(Math.random() * 20) + 5;
    await axios.post("http://localhost:5000/api/scan", {
      timeSpent,
      location: { lat: 28.61, lng: 77.2 },
    });

    // Get analytics
    const [totalRes, campaignRes] = await Promise.all([
      axios.get("http://localhost:5000/api/scan/total"),
      axios.get("http://localhost:5000/api/scan/campaign"),
    ]);

    setAnalytics({
      total: totalRes.data.total,
      avgTimeSpent: campaignRes.data.avgTimeSpent,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Experience Print Come to Life
      </h1>

      <div className="flex flex-col items-center gap-6">
        {!scanned && !showScanner && (
          <button
            onClick={() => setShowScanner(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            📱 Scan QR Code
          </button>
        )}

        {showScanner && <QRScanner onScanSuccess={handleScanSuccess} />}

        {scanned && (
          <>
            <ARViewer />
            <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Buy Now
            </button>
            <div className="mt-6 p-4 bg-white rounded shadow w-full max-w-md">
              <h2 className="text-lg font-semibold mb-2">
                📊 Campaign Analytics
              </h2>
              <p>
                Total Scans: <strong>{analytics.total}</strong>
              </p>
              <p>
                Avg. Time Spent:{" "}
                <strong>{analytics.avgTimeSpent} seconds</strong>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
