build:
    cargo build --release --target wasm32-wasip2

run:
    wasmtime run --invoke 'query("{\"oke\": 1}", "oke")' ./target/wasm32-wasip2/release/jsongrep_wasm.wasm | sed 's/^ok(//; s/)$//'
    wasmtime run --invoke 'query-first("{\"oke\": 1}", "oke")' ./target/wasm32-wasip2/release/jsongrep_wasm.wasm | sed 's/^ok(//; s/)$//' | jq -r
    wasmtime run --invoke 'query-with-path("{\"oke\": 1}", "oke")' ./target/wasm32-wasip2/release/jsongrep_wasm.wasm | sed 's/^ok(//; s/)$//'

    # yaml support
    wasmtime run --invoke 'query("oke: 1", "oke")' ./target/wasm32-wasip2/release/jsongrep_wasm.wasm | sed 's/^ok(//; s/)$//'
    wasmtime run --invoke 'query-first("oke: 1", "oke")' ./target/wasm32-wasip2/release/jsongrep_wasm.wasm | sed 's/^ok(//; s/)$//'
    wasmtime run --invoke 'query-with-path("oke: 1", "oke")' ./target/wasm32-wasip2/release/jsongrep_wasm.wasm | sed 's/^ok(//; s/)$//'
