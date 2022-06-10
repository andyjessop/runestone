import { Req } from "@andyjessop/cf-worker-server";
import { Entry, Project } from "@runestone/interfaces";

export async function deleteEntry(req: Req) {
  const entry = req.meta.entry as Entry;
  const project = req.meta.project as Project;

  const entryNdx = project.entries.findIndex(e => e.id === entry.id);

  if (entryNdx === -1) {
    throw {
      code: 400,
      message: 'That entry does not exist.'
    }
  }

  project.entries.splice(entryNdx, 1);

  return;
}