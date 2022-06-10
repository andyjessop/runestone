import { Req } from "@andyjessop/cf-worker-server";
import { Entry, Project } from "@runestone/interfaces";
import { isEntry } from "@runestone/utils";
import { update } from "../model";

export async function updateEntry(req: Req) {
  const { content, meta } = req;
  const project = meta.project as Project;
  const entry = meta.entry as Entry;

  if (!isEntry(content)) {
    throw {
      code: 400,
      message: 'Invalid entry body.'
    }
  }

  const entryNdx = project.entries.findIndex(e => e.id === entry.id)

  const updatedEntry = update(entry, content);

  project.entries[entryNdx] = updatedEntry;

  meta.entry = updatedEntry;

  return;
}