// import React, { useState } from "react";
// import { useEffect } from "react";
// import QrScanner from "react-qr-scanner";
// import axiosInstance from "../utils/axios/axios";
// import { Alert, Spinner } from "@material-tailwind/react";
// import { BsPatchCheck } from "react-icons/bs";
// import { CiWarning } from "react-icons/ci";
// import PrimaryButton from "./PrimaryButton";

// const QRScannerComponent = () => {
//   const [qrCode, setQrCode] = useState(null);
//   const [alert, setAlert] = useState(false);
//   const [bgColor, setBgColor] = useState("");
//   const [icon, setIcon] = useState("");
//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleScan = (data) => {
//     // console.log("first");
//     if (data) {
//       try {
//         // Use the callback in setQrCode to ensure qrCode state is updated
//         setQrCode(data);
//         console.log("first");
//       } catch (error) {
//         console.error("Error setting QR code data:", error);
//       }
//     }
//   };

//   // useEffect to handle side effects after the component renders
//   useEffect(() => {
//     let data = {};
//     if (qrCode !== null) {
//       try {
//         const parsedData = JSON.parse(qrCode.text);
//         // console.log("Parsed QR code data:", parsedData);

//         // Check if the parsedData object has the ticketId property
//         if (parsedData && "ticketId" in parsedData) {
//           setLoading(true);
//           const ticketId = parsedData.ticketId;
//           // console.log("Ticket ID:", ticketId);
//           data = {
//             numberOfPasses: 1,
//             ticketId: ticketId,
//           };
//           axiosInstance
//             .post("/events/ticket/validate", data)
//             .then((res) => {
//               if (res && res.data) {
//                 setAlert(!alert);
//                 setBgColor("green");
//                 setIcon(<BsPatchCheck />);
//                 setLoading(false);
//                 setResponse(res.data.message);
//                 setQrCode(null);
//               }
//             })
//             .catch((err) => {
//               setLoading(false);
//               setAlert(!alert);
//               setBgColor("red");
//               setIcon(<CiWarning />);
//               setResponse(err.response?.data?.message || err.message);
//               setQrCode(null);
//             });
//         }
//       } catch (error) {
//         console.error("Error parsing QR code data:", error);
//       }

//       // Reset the QR scanner after a successful scan
//       // You may need to find the appropriate way to reset your scanner component
//       // This could involve setting the key prop or some other method

//       // For example, assuming you have a resetScanner function
//       // resetScanner();
//     }
//   }, [qrCode]);

//   setTimeout(() => {
//     if (alert === true) {
//       setAlert(false);
//     }
//   }, 3000);

//   const handleError = (error) => {
//     console.error("Error scanning QR code:", error);
//   };

//   const scannerStyle = {
//     width: "100%",
//     height: "auto",
//     borderRadius: "12px",
//   };

//   return (
//     <div className="grid">
//       {alert && (
//         <Alert
//           animate={{
//             mount: { y: 0 },
//             unmount: { y: 0 },
//           }}
//           color={bgColor}
//           icon={icon}
//           className="absolute h-auto top-8 w-11/12 right-5 z-50"
//         >
//           {response}
//         </Alert>
//       )}
//       <div className="border-s border-e grid border-primary m-5 p-5 rounded-xl space-y-5">
//         {loading ? (
//           <Spinner color="pink" className="mx-auto" />
//         ) : (
//           <QrScanner
//             delay={300}
//             onError={handleError}
//             onScan={handleScan}
//             style={scannerStyle}
//             constraints={{ video: { facingMode: "environment" } }}
//           />
//         )}
//         {/* {qrCode && <p>Scanned QR Code: {qrCode?.ticketId}</p>} */}
//         <PrimaryButton text={"Scan Code"} />
//       </div>
//     </div>
//   );
// };

// export default QRScannerComponent;

import React, { useState, useEffect } from "react";
import QrReader from "modern-react-qr-reader";
import axiosInstance from "../utils/axios/axios";
import { Alert, Spinner } from "@material-tailwind/react";
import { BsPatchCheck } from "react-icons/bs";
import { CiWarning } from "react-icons/ci";
import PrimaryButton from "./PrimaryButton";

const QRScannerComponent = () => {
  const [qrCode, setQrCode] = useState(null);
  const [alert, setAlert] = useState(false);
  const [bgColor, setBgColor] = useState("");
  const [icon, setIcon] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);

  const handleScan = (data) => {
    if (data && scanning) {
      try {
        setQrCode(data);
        setScanning(false); // Stop scanning after a successful scan
      } catch (error) {
        console.error("Error setting QR code data:", error);
      }
    }
  };

  const startScanning = () => {
    setScanning(true);
  };

  useEffect(() => {
    let data = {};
    if (qrCode !== null) {
      try {
        const parsedData = JSON.parse(qrCode);
        if (parsedData && "ticketId" in parsedData) {
          setLoading(true);
          const ticketId = parsedData.ticketId;
          data = {
            numberOfPasses: 1,
            ticketId: ticketId,
          };
          axiosInstance
            .post("/events/ticket/validate", data)
            .then((res) => {
              if (res && res.data) {
                setAlert(!alert);
                setBgColor("green");
                setIcon(<BsPatchCheck />);
                setLoading(false);
                setResponse(res.data.message);
                setQrCode(null);
              }
            })
            .catch((err) => {
              setLoading(false);
              setAlert(!alert);
              setBgColor("red");
              setIcon(<CiWarning />);
              setResponse(err.response?.data?.message || err.message);
              setQrCode(null);
            });
        }
      } catch (error) {
        console.error("Error parsing QR code data:", error);
      }
    }
  }, [qrCode, scanning, alert]);

  useEffect(() => {
    // Clean up scanning status when the component unmounts
    return () => setScanning(false);
  }, []);

  const handleError = (error) => {
    console.error("Error scanning QR code:", error);
  };

  setTimeout(() => {
    if (alert === true) {
      setAlert(false);
    }
  }, 3000);

  const scannerStyle = {
    width: "100%",
    height: "auto",
    borderRadius: "12px",
  };

  return (
    <div className="grid">
      {alert && (
        <Alert
          animate={{
            mount: { y: 0 },
            unmount: { y: 0 },
          }}
          color={bgColor}
          icon={icon}
          className="absolute h-auto top-8 w-11/12 right-5 z-50"
        >
          {response}
        </Alert>
      )}
      <div className="border-s border-e grid border-primary m-5 p-5 rounded-xl">
        {loading ? (
          <Spinner color="pink" className="mx-auto" />
        ) : (
          <div className="grid gap-5">
            {/* <button onClick={startScanning}>Start Scanning</button> */}
            <QrReader
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={scannerStyle}
              facingMode={"environment"}
            />
            <PrimaryButton onClick={startScanning} text={"Scan Code"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScannerComponent;
