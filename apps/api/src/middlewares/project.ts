import { KV } from '@runestone/kv';
import { Req } from '@andyjessop/cf-worker-server';

export async function withProject(req: Req, kv: KV): Promise<void> {
  const project = req.params?.name;

  const state = await kv.get(`project:${project}:state`);

  if (!state) {
    throw {
      code: 404,
      message: 'Project not found'
    };
  }

  (req as Req).meta.project = state;
}

export async function saveProject(request: Req, kv: KV): Promise<void> {
  const project = request.meta.project;

  if (!project) {
    throw {
      code: 500,
      message: 'Project state not found.'
    };
  }

  await kv.put(`project:${project.name}:state`, project);
}