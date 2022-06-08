export interface KV {
  delete(key: string): Promise<unknown>;
  get(key: string): Promise<unknown>;
  list({ prefix, limit, cursor }: { prefix?: string, limit?: number, cursor?: string }): Promise<string[]>;
  put(key: string, val: unknown): Promise<void>
}