import { Req } from "@andyjessop/cf-worker-server";

export function retrieveFromCache(cache: Cache) {
  return async function retrieve(req: Req) {
    const cacheKey = req.meta.cacheKey;
  
    const response = await cache.match(cacheKey);
  
    if (response) {
      return response;
    }
  }
}