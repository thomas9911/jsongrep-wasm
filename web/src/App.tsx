import { APITester } from "./APITester";
import "./index.css";

export function App() {
  return (
    <div className="app">
      <h1 style={{ marginTop: "20px" }}>JSONGrep</h1>
      <div className="api-tester-wrapper">
        <APITester />
      </div>
    </div>
  );
}

export default App;
