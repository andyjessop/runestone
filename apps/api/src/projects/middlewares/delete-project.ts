import { Req } from "@andyjessop/cf-worker-server";
import { KV } from "@runestone/kv";
import { buildProjectStateKey } from "@runestone/utils";

export async function deleteProject(request: Req, kv: KV): Promise<void> {
  const project = request.meta.project;

  if (!project) {
    throw {
      code: 500,
      message: 'Project state not found.'
    };
  }

  await kv.delete(buildProjectStateKey(project.name));
}