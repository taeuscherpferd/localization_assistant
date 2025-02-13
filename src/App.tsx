import { MainPage } from "src/components/MainPage/MainPage";
import { useRustStore } from "src/hooks/useRustStore";
import "./App.scss";

function App() {
  const {localizerSettings, saveSettings} = useRustStore();
  return (
    <main className="container">
      <MainPage localizerSettings={localizerSettings} saveSettings={saveSettings} />
    </main>
  );
}

export default App;

