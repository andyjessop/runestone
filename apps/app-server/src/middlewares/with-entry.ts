import { Req } from "@andyjessop/cf-worker-server";
import { Entry, Project } from "@runestone/interfaces";

export async function withEntry(req: Req) {
  const { entries } = req.meta.project as Project;

  const entry = entries.find(entryHasValidBaseUrl(req.url));

  if (!entry) {
    throw {
      code: 404,
      message: 'No entry found whose baseUrl matches this URL.'
    }
  }

  req.meta.entry = entry;
}

function entryHasValidBaseUrl(url: string) {
  return function checkEntry(entry: Entry) {
    return entry.baseUrls.some(baseUrl => url.startsWith(baseUrl));
  };
}