import { Req } from "@andyjessop/cf-worker-server";
import { Project } from "@runestone/interfaces";
import { isCreateEntry } from "@runestone/utils";
import { create } from "../model";

export async function createEntry(req: Req) {
  const { content, meta } = req;
  const project = meta.project as Project;

  if (!isCreateEntry(content)) {
    throw {
      code: 400,
      message: 'Invalid entry body.'
    }
  }

  const entry = create(content);

  if (project.entries.find(e => e.id === entry.id)) {
    throw {
      code: 400,
      message: 'That env already exists.'
    }
  }

  project.entries.push(entry);

  meta.entry = entry;

  return;
}