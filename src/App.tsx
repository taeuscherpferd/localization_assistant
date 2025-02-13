import { Store } from "@tauri-apps/plugin-store";
import { MainPage } from "src/components/MainPage/MainPage";
import { useRustStore } from "src/hooks/useRustStore";
import "./App.scss";

interface AppProps {
  tauriStore: Store;
}

function App({ tauriStore }: AppProps) {
  const {localizerSettings, saveSettings} = useRustStore(tauriStore);
  return (
    <main className="container">
      <MainPage localizerSettings={localizerSettings} saveSettings={saveSettings} />
    </main>
  );
}

export default App;

