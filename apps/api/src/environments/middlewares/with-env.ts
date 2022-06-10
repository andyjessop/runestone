import { Req } from "@andyjessop/cf-worker-server";
import { Project } from "@runestone/interfaces";

export async function withEnv(req: Req) {
  const { envs, name } = req.meta.project as Project;
  const envName = req.params?.env;

  const env = envs.find(e => e.name === envName);

  if (!env) {
    throw {
      code: 404,
      message: `No ${envName} env found for project ${name}.`
    }
  }

  req.meta.env = env;
}