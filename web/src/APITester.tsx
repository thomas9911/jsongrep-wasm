import { useRef, type FormEvent } from "react";
import { jsongrep } from "generated/jsongrep_wasm";
import { useId } from "react";

export function APITester() {
  // Refs for the three required areas: Data Input, Query Input, and Response Output
  const dataInputRef = useRef<HTMLTextAreaElement>(null);
  const queryInputRef = useRef<HTMLTextAreaElement>(null);
  const responseOutputRef = useRef<HTMLTextAreaElement>(null);

  const queryId = useId();
  const dataId = useId();
  const outputId = useId();

  const handleTestEndpoint = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rawData = dataInputRef.current?.value || "";
    const rawQuery = queryInputRef.current?.value || "";

    if (!rawData || !rawQuery) {
      responseOutputRef.current!.value =
        "Please provide both data (JSON/YAML) and a query.";
      return;
    }

    // Clear previous output
    responseOutputRef.current!.value = "Executing query...";

    try {
      // We will use the 'query' function which handles input guessing internally.
      // The implementation assumes 'jsongrep.query' accepts (input: string, query: string)
      const results: string[] = jsongrep.query(rawData, rawQuery);

      // Update output with results
      const output =
        results.length > 0
          ? results.join("\\n\\n---\\n\\n")
          : "No results found matching the query.";
      responseOutputRef.current!.value = output;
    } catch (error) {
      // Handle WASM execution errors (e.g., invalid JSON/YAML, invalid query syntax)
      let errorMessage =
        "An unknown error occurred during the WASM query execution.";
      if (typeof error === "string") {
        errorMessage = error;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      responseOutputRef.current!.value = `ERROR: ${errorMessage}`;
    }
  };

  return (
    <div className="api-tester">
      {/* ROW 1: Query Input (Small) - Stays at the top */}
      <div className="query-input-group">
        <label htmlFor={queryId}>Query:</label>
        <textarea
          id={queryId}
          ref={queryInputRef}
          placeholder="Enter your regex-like query pattern (e.g., 'key: value')."
          className="response-area query-box"
        />
      </div>

      {/* MAIN CONTENT ROW: Two columns - Output (Left) and Inputs/Controls (Right) */}
      <div className="main-content-row">
        {/* LEFT COLUMN: Output Box */}
        <div className="output-container">
          <label>Results:</label>
          <textarea
            ref={responseOutputRef}
            readOnly
            id={outputId}
            placeholder="Results from the query will appear here..."
            className="response-area output-box"
          />
        </div>

        {/* RIGHT/CENTER AREA: JSON Input and Button Group */}
        <div className="data-query-controls">
          {/* Data Input (Large) */}
          <div className="input-group large-json-input">
            <label htmlFor={dataId}>Data (JSON/YAML):</label>
            <textarea
              id={dataId}
              ref={dataInputRef}
              placeholder="Paste your JSON or YAML data here."
              className="response-area large-json-box"
            />
          </div>

          {/* Form and Button */}
          <form onSubmit={handleTestEndpoint} className="endpoint-row">
            <button type="submit" className="send-button">
              Run Query
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
