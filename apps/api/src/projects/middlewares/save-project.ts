import { KV } from '@runestone/kv';
import { Req } from '@andyjessop/cf-worker-server';
import { buildProjectStateKey } from '@runestone/utils';

export async function saveProject(request: Req, kv: KV): Promise<void> {
  const project = request.meta.project;

  if (!project) {
    throw {
      code: 500,
      message: 'Project state not found.'
    };
  }

  await kv.put(buildProjectStateKey(project.name), project);
}