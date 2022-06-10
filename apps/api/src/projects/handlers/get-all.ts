import { json, Req } from "@andyjessop/cf-worker-server";
import { KV } from "@runestone/kv";

export async function getAll(req: Req, kv: KV) {
  const list = await kv.list({ prefix: 'project:' });
  
  return json(list.map(key => key.split(':')[1]));
}