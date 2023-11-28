import { Slider } from "@material-tailwind/react";
import React, { useState } from "react";
import QrScanner from "react-qr-scanner";

const QRScannerComponent = () => {
  const [qrCode, setQrCode] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setQrCode(data);
    }
  };

  const handleError = (error) => {
    console.error("Error scanning QR code:", error);
  };

  const scannerStyle = {
    width: "100%",
    height: "auto",
    borderRadius: "12px",
  };

  const [zoomLevel, setZoomLevel] = useState(90);

  const handleZoomChange = (event) => {
    const { value } = event.target;
    setZoomLevel(value);
    // console.log(value);
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
          zoom={zoomLevel}
        />
        {qrCode && <p>Scanned QR Code: {qrCode}</p>}
      </div>
      <div className="mx-10">
        <Slider
          size="sm"
          className="text-primary"
          value={zoomLevel.toString()}
          onChange={handleZoomChange}
        />
      </div>
    </div>
  );
};

export default QRScannerComponent;
