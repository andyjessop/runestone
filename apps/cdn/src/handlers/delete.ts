import { json, Req } from "@andyjessop/cf-worker-server";
import { Env } from "..";

export async function deleteOne(req: Req, env: Env) {
  const { objectKey } = req.meta;

  await env.BUCKET.delete(objectKey);

  return json(null);
}