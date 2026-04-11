/** @module Interface jsongrep:jsongrep/jsongrep@0.1.0 **/
export function queryWithTimings(input: string, query: string): TimingResults;
export function queryWithPath(input: string, query: string): Array<[string, string]>;
export function query(input: string, query: string): Array<string>;
export function queryFirst(input: string, query: string): string;
export interface Timings {
  compileNs: bigint,
  queryNs: bigint,
  parsingNs: bigint,
  stringifyNs: bigint,
}
export interface TimingResults {
  timings: Timings,
  results: Array<[string, string]>,
}
