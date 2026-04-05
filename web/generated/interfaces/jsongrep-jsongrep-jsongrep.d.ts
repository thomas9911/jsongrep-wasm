/** @module Interface jsongrep:jsongrep/jsongrep@0.1.0 **/
export function queryWithPath(input: string, query: string): Array<[string, string]>;
export function query(input: string, query: string): Array<string>;
export function queryFirst(input: string, query: string): string;
