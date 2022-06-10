import { Req } from "@andyjessop/cf-worker-server";
import { Project } from "@runestone/interfaces";

export async function withDeployment(req: Req) {
  const { deployments, name } = req.meta.project as Project;
  const hash = req.params?.hash;

  const deployment = deployments.find(e => e.hash === hash);

  if (!deployment) {
    throw {
      code: 404,
      message: `No entry found with hash ${hash} found for project ${name}.`
    }
  }

  req.meta.deployment = deployment;
}