import { Req } from "@andyjessop/cf-worker-server";
import { Environment, Project } from "@runestone/interfaces";

export async function deleteEnv(req: Req) {
  const env = req.meta.env as Environment;
  const project = req.meta.project as Project;

  const envNdx = project.envs.findIndex(e => e.name === env.name);

  if (envNdx === -1) {
    throw {
      code: 400,
      message: 'That env does not exist.'
    }
  }


  project.envs.splice(envNdx, 1);

  return;
}