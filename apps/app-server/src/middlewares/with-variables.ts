import { Req } from "@andyjessop/cf-worker-server";
import { Entry, Environment } from "@runestone/interfaces";
import { removeDuplicatesByProp } from "@runestone/utils";

export async function withVariables(req: Req) {
  const env = req.meta.env as Environment;
  const entry = req.meta.entry as Entry;

  const variables = [
    ...entry.variables,
    ...env.variables
  ];

  const uniqueVariables = removeDuplicatesByProp(variables, 'name');

  req.meta.variables = uniqueVariables;
}