import { KV } from "./types";

export function kv(kv: KVNamespace): KV {
  return {
    delete: deleteOne,
    get,
    list,
    put
  };

  async function deleteOne(key: string): Promise<unknown> {
    return await kv.delete(key);
  }

  async function get(key: string): Promise<unknown> {
    const val = await kv.get(key);

    if (val === null) {
      return val;
    }
  
    try {
      return JSON.parse(val) as unknown;
    } catch (e) {
      return val;
    }
  }

  async function list(options: {prefix?: string, limit?: number, cursor?: string}) {
    const value = await kv.list(options);

    return value.keys.map(key => key.name);
  }
  
  /**
   * Put a value into the KV store. Will stringify if necessary.
   */
  async function put(key: string, val: unknown): Promise<void> {
    const str = typeof val === 'string' ? val : JSON.stringify(val);
  
    return kv.put(key, str);
  }
}
