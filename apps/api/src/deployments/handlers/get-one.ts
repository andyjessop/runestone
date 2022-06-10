import { json, Req } from "@andyjessop/cf-worker-server";

export async function getOne(req: Req) {  
  return json(req.meta.deployment);
}