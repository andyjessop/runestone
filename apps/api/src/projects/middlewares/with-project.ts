import { KV } from '@runestone/kv';
import { Req } from '@andyjessop/cf-worker-server';
import { buildProjectStateKey } from '@runestone/utils';

export async function withProject(req: Req, kv: KV): Promise<void> {
  const projectName = req.params?.name;

  const state = await kv.get(buildProjectStateKey(projectName));

  if (!state) {
    throw {
      code: 404,
      message: 'Project not found'
    };
  }

  req.meta.project = state;
}