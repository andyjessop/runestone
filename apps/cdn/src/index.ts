import { error, missing, server } from '@andyjessop/cf-worker-server';
import { APIError } from '@runestone/interfaces';
import { deleteOne } from './handlers/delete';
import { get } from './handlers/get';
import { post } from './handlers/post';
import { retrieveFromCache } from './middlewares/retrieve-from-cache';
import { withCacheKey } from './middlewares/with-cache-key';
import { withObject } from './middlewares/with-object';
import { withObjectKey } from './middlewares/with-object-key';
import { withSupportedContentType } from './middlewares/with-supported-content-type';

export interface Env {
  BUCKET: R2Bucket
}

const app = server<[Env, ExecutionContext]>();
const cache = caches.default;

export default {
  fetch,
}

async function fetch(request: Request, env: Env, context: ExecutionContext): Promise<unknown> {
  return app.handle(request, env, context).catch((err: APIError) => {
    return error(err.code, err.message);
  });
}

app.get(
  '/assets',
  withCacheKey,
  retrieveFromCache(cache),
  withObjectKey,
  withObject,
  get(cache),
);

app.post(
  '/assets',
  withSupportedContentType,
  withObjectKey,
  post,
);

app.delete(
  '/assets',
  withObjectKey,
  deleteOne,
);

app.get('*', async () => {
  return missing('URL not found.');
});
