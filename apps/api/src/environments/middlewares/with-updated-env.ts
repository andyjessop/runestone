import { Req } from "@andyjessop/cf-worker-server";
import { update } from "../model";

export async function withUpdatedEnv(req: Req) {
  const { content, meta } = req;

  if (!content.name) {
    throw {
      code: 400,
      message: 'Env must have a name'
    }
  }

  meta.env = update(content.name, content.env);

  return;
}