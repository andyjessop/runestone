import { server } from '@andyjessop/cf-worker-server';

export default {
  fetch,
};

async function fetch(request: Request): Promise<Response> {
  return new Response('ok');
}
