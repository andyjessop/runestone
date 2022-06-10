import { Req } from "@andyjessop/cf-worker-server";
import { update } from "../model";

export async function withUpdatedProject(req: Req) {
  const { content, meta } = req;

  if (!content.name) {
    throw {
      code: 400,
      message: 'Project must have a name'
    }
  }

  meta.project = update(content.name, content.project);

  return;
}