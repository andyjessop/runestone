import { json, Req } from "@andyjessop/cf-worker-server";
import { Project } from "@runestone/interfaces";

export async function getAll(req: Req) {
  const { entries } = req.meta.project as Project;
  
  return json(entries);
}