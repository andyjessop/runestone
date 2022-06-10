import { Req } from "@andyjessop/cf-worker-server";
import { Entry, Environment } from "@runestone/interfaces";
import { removeDuplicatesByProp } from "@runestone/utils";

export async function withFeatures(req: Req) {
  const env = req.meta.env as Environment;
  const entry = req.meta.entry as Entry;

  const features = [
    ...entry.features,
    ...env.features
  ];

  const uniqueFeatures = removeDuplicatesByProp(features, 'name');

  req.meta.features = uniqueFeatures;
}