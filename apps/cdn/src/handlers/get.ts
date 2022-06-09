import { Req } from "@andyjessop/cf-worker-server";
import { Env } from "..";

export function get(cache: Cache) {
  return async function g(req: Req, env: Env, ctx: ExecutionContext) {
    const { cacheKey, object } = req.meta;
  
    const headers = new Headers();
  
    object.writeHttpMetadata(headers);
  
    headers.set('etag', object.httpEtag);
    
    const status = object.body ? 200 : 304;
  
    const response = new Response(object.body, {
      headers,
      status
    });
  
    response.headers.append('Cache-Control', 's-maxage=31536000');
    response.headers.append('Access-Control-Allow-Origin', '*');
  
    ctx.waitUntil(cache.put(cacheKey, response.clone()));
  
    return response;
  };
}