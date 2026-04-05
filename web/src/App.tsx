import { APITester } from "./APITester";
import "./index.css";

export function App() {
  return (
    <div className="app">
      <div className="logo-container"></div>
      <h1 style={{ marginTop: "20px" }}>Bun + React</h1>
      <p>
        Edit <code>src/App.tsx</code> and save to test HMR
      </p>
              <div className="api-tester-wrapper">
          <APITester />
        </div>
    </div>
  );
}

export default App;
