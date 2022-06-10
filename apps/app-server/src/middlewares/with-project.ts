import { Req } from "@andyjessop/cf-worker-server";
import { KV } from "@runestone/kv";
import { buildProjectStateKey } from "@runestone/utils";

export function withProject(projectName: string) {
  return async function addProjectToMeta(req: Req, kv: KV) {
    const project = await kv.get(buildProjectStateKey(projectName));

    if (!project) {
      throw {
        code: 404,
        message: 'Project not found',
      };
    }

    req.meta.project = project;
  }
}