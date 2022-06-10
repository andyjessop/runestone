import { Req } from "@andyjessop/cf-worker-server";
import { create } from "../model";

export async function withNewProject(req: Req) {
  const { content, meta } = req;

  if (!content.name) {
    throw {
      code: 400,
      message: 'Project must have a name'
    }
  }

  meta.project = create(content.name, content.project);

  return;
}