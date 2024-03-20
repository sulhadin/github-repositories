import React from "react";

import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";

import { store, persist } from "./store/store.ts";

import "./index.css";
import App from "./app/App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
