import { Req } from "@andyjessop/cf-worker-server";
import { Entry, Project } from "@runestone/interfaces";

export async function withEnv(req: Req) {
  const { envs } = req.meta.project as Project;
  const entry = req.meta.entry as Entry;

  const env = envs.find(e => e.name === entry.envName);

  if (!env) {
    throw {
      code: 404,
      message: 'No entry found whose baseUrl matches this URL.'
    }
  }

  req.meta.env = env;
}