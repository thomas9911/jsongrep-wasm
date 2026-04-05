import { useRef, type FormEvent } from "react";
import { jsongrep } from "generated/jsongrep_wasm";

export function APITester() {
  // Refs for the three required areas: Data Input, Query Input, and Response Output
  const dataInputRef = useRef<HTMLTextAreaElement>(null);
  const queryInputRef = useRef<HTMLTextAreaElement>(null);
  const responseOutputRef = useRef<HTMLTextAreaElement>(null);

  const handleTestEndpoint = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rawData = dataInputRef.current?.value || "";
    const rawQuery = queryInputRef.current?.value || "";

    if (!rawData || !rawQuery) {
      responseOutputRef.current!.value = "Please provide both data (JSON/YAML) and a query.";
      return;
    }

    // Clear previous output
    responseOutputRef.current!.value = "Executing query...";

    try {
      // We will use the 'query' function which handles input guessing internally.
      // The implementation assumes 'jsongrep.query' accepts (input: string, query: string)
      const results: string[] = jsongrep.query(rawData, rawQuery);

      // Update output with results
      const output = results.length > 0 ? results.join("\\n\\n---\\n\\n") : "No results found matching the query.";
      responseOutputRef.current!.value = output;

    } catch (error) {
      // Handle WASM execution errors (e.g., invalid JSON/YAML, invalid query syntax)
      let errorMessage = "An unknown error occurred during the WASM query execution.";
      if (typeof error === 'string') {
        errorMessage = error;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      responseOutputRef.current!.value = `ERROR: ${errorMessage}`;
    }
  };

  return (
    <div className="api-tester">
      {/* Input Section: Two Textareas for Data and Query */}
      <div className="input-container">
        <div className="input-group">
          <label htmlFor="data-input">Data (JSON/YAML):</label>
          <textarea
            id="data-input"
            ref={dataInputRef}
            placeholder="Paste your JSON or YAML data here."
            className="response-area"
          />
        </div>
        <div className="input-group">
          <label htmlFor="query-input">Query (DFA Pattern):</label>
          <textarea
            id="query-input"
            ref={queryInputRef}
            placeholder="Enter your regex-like query pattern (e.g., 'key: value')."
            className="response-area"
          />
        </div>
      </div>

      {/* Form and Button */}
      <form onSubmit={handleTestEndpoint} className="endpoint-row">
        <button type="submit" className="send-button">
          Run Query
        </button>
      </form>

      {/* Output Section: Single read-only output area */}
      <div className="output-container">
        <label>Results:</label>
        <textarea
          ref={responseOutputRef}
          readOnly
          placeholder="Results from the query will appear here..."
          className="response-area"
        />
      </div>
    </div >
  );
}