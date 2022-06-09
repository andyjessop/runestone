import { error, json, Req, server } from '@andyjessop/cf-worker-server';
import { APIError } from '@runestone/interfaces';
import { kv as createKV, KV } from '@runestone/kv';
import { saveProject, withProject } from './middlewares/project';
import * as project from './project';

interface WorkerService {
  fetch: (request?: Request, env?: Env) => Promise<Response>;
}

interface Env {
  BUCKET: KVNamespace;
  CDN: WorkerService;
}

export default {
  fetch,
}

async function fetch(request: Request, env: Env): Promise<unknown> {
  const kv = createKV(env.BUCKET);

  const test = await env.CDN.fetch(request);

  console.log(test);

  return app.handle(request, kv).catch((err: APIError) => {
    return error(err.code, err.message);
  });
}

const app = server<[KV]>();

app.get(
  '/projects',
  async (req, kv) => {
    const list = await kv.list({ prefix: 'project:' });
    return json(list.map(key => key.split(':')[1]));
  },
);

app.get(
  '/projects/:name',
  withProject,
  async (req) => json(req.meta.project),
);

app.post(
  '/projects',
  validateCreateProject,
  async ({ content, meta }) => {
    meta.project = project.create(content.name, content.project);

    return;
  },
  saveProject,
  async (req) => json(req.meta.project),
);

app.put(
  '/projects/:name',
  validateUpdateProject,
  async ({ content, meta }) => {
    meta.project = project.update(meta.project, content.project);

    return;
  },
  saveProject,
  async (req) => json(req.meta.project),
);

async function validateCreateProject({ content }: Req ) {
  if (!content.name) {
    throw {
      code: 400,
      message: 'Project must have a name'
    }
  }
}

async function validateUpdateProject({ content }: Req ) {
  if (!content.name) {
    throw {
      code: 400,
      message: 'Project must have a name'
    }
  }
}

app.get('*', async (req) => {
  return new Response('404');
});