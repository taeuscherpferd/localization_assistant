import { load } from "@tauri-apps/plugin-store";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const renderApp = async () => {
  const store = await load(".settings.json");

  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App tauriStore={store} />
    </React.StrictMode>,
  );
}


renderApp();
