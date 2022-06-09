import { Req } from '@andyjessop/cf-worker-server';

export async function withObjectKey(req: Req): Promise<Response | void> {
  console.log(
    `Response for request url: ${req.url} not present in cache. Fetching and caching request.`
  );

  const url = new URL(req.url);
  
  const [_, objectKey] = url.pathname.split('/');

  if (typeof objectKey !== 'string' || objectKey.length < 1) {
    throw {
      code: 400,
      message: `Object key cannot be derived from path ${url}.`
    };
  }

  req.meta.objectKey = objectKey;
}