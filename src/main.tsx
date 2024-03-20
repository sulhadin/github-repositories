import React from "react";

import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";

import { store, persist } from "./store/store.ts";
import GithubRepositoryList from "./RepositoryTable.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        <GithubRepositoryList />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
