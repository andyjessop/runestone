import { Req } from "@andyjessop/cf-worker-server";
import { Project } from "@runestone/interfaces";
import { create } from "../model";

export async function withNewEnv(req: Req) {
  const { content, meta } = req;

  if (!content.name) {
    throw {
      code: 400,
      message: 'Env must have a name'
    }
  }

  const env = create(content.name, content.env);

  const project = meta.project as Project;

  if (project.envs.find(e => e.name === env.name)) {
    throw {
      code: 400,
      message: 'That env already exists.'
    }
  }

  project.envs.push(env);

  meta.env = env;

  return;
}