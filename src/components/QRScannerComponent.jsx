import React, { useState } from "react";
import { useEffect } from "react";
import QrScanner from "react-qr-scanner";

const QRScannerComponent = () => {
  const [qrCode, setQrCode] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setQrCode(data);
    }
    // console.log(qrCode);
  };

  useEffect(() => {
    console.log(qrCode);
  }, [handleScan]);

  const handleError = (error) => {
    console.error("Error scanning QR code:", error);
  };

  const scannerStyle = {
    width: "100%",
    height: "auto",
    borderRadius: "12px",
  };

  return (
    <div>
      <div className="border-s border-e  border-primary m-5 p-5 rounded-xl">
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={scannerStyle}
          constraints={{ video: { facingMode: "environment" } }}
        />
        {qrCode && <p>Scanned QR Code: {qrCode?.text?.ticketId}</p>}
      </div>
    </div>
  );
};

export default QRScannerComponent;
