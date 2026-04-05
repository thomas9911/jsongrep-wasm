import { useRef, type FormEvent } from "react";
import { jsongrep } from "generated/jsongrep_wasm";

export function APITester() {
  const responseInputRef = useRef<HTMLTextAreaElement>(null);

  const testEndpoint = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // try {
    //   const form = e.currentTarget;
    //   const formData = new FormData(form);
    //   const endpoint = formData.get("endpoint") as string;
    //   const url = new URL(endpoint, location.href);
    //   const method = formData.get("method") as string;
    //   const res = await fetch(url, { method });

    //   const data = await res.json();
    //   responseInputRef.current!.value = JSON.stringify(data, null, 2);
    // } catch (error) {
    //   responseInputRef.current!.value = String(error);
    // }
    console.log(e.target);
    const formData = new FormData(e.target);
    console.log(formData);
    console.log(jsongrep.queryFirst("oke: 15", "oke"));
  };

  return (
    <div className="api-tester">
      <form onSubmit={testEndpoint} className="endpoint-row">
        <textarea
          id="input"
          placeholder="give json or yaml"
          className="response-area"
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
      <textarea
        ref={responseInputRef}
        readOnly
        placeholder="Response will appear here..."
        className="response-area"
      />
    </div>
  );
}
