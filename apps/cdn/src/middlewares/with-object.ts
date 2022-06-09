import { missing, Req } from '@andyjessop/cf-worker-server';
import { Env } from '..';

export async function withObject(req: Req, env: Env): Promise<Response | void> {
  const { objectKey } = req.meta;

  const object = await env.BUCKET.get(objectKey);

  if (object === null) {
    return missing(`Object ${objectKey} not found`);
  }

  (req as Req).meta.object = object;
}