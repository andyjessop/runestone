import { Req } from "@andyjessop/cf-worker-server";
import { Entry, Project } from "@runestone/interfaces";

export async function withDeployment(req: Req) {
  const { deployments } = req.meta.project as Project;
  const entry = req.meta.entry as Entry;

  const deployment = deployments.find(d => d.hash === entry.deploymentHash);

  if (!deployment) {
    throw {
      code: 404,
      message: 'No deployment found with hash that matches the entry for this URL.'
    }
  }

  req.meta.deployment = deployment;
}