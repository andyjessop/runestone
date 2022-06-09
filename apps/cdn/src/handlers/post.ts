import { Req } from "@andyjessop/cf-worker-server";
import { Env } from "..";

export async function post(req: Req, env: Env) {
  const { contentType, objectKey } = req.meta;

  const object = await env.BUCKET.put(objectKey, req.body, {
    httpMetadata: {
      ...req.headers,
      contentType,
    }
  });

  return new Response(null, {
    headers: {
      'etag': object.httpEtag,
    }
  });
}