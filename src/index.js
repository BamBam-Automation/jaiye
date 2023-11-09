import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { store, persistor } from "./utils/app/store";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider>
        <GoogleOAuthProvider clientId="748855953781-qi4g2a0c2jca2veh2n2pd1ge1o1d65o4.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </ThemeProvider>
    </PersistGate>
    {/* </React.StrictMode> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
