import { Req } from "@andyjessop/cf-worker-server";
import { Project } from "@runestone/interfaces";

export async function withEntry(req: Req) {
  const { entries, name } = req.meta.project as Project;
  const id = req.params?.id;

  const entry = entries.find(e => e.id === id);

  if (!entry) {
    throw {
      code: 404,
      message: `No entry found with id ${id} found for project ${name}.`
    }
  }

  req.meta.entry = entry;
}