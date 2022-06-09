import { Req } from "@andyjessop/cf-worker-server";

export async function withCacheKey(req: Req) {
  const cacheUrl = new URL(req.url);
  
  req.meta.cacheKey = new Request(cacheUrl.toString(), req);
}