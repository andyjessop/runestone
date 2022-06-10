import { Req } from "@andyjessop/cf-worker-server";
import { Deployment, Project } from "@runestone/interfaces";
import { isDeployment } from "@runestone/utils";
import { update } from "../model";

export async function updateDeployment(req: Req) {
  const { content, meta } = req;
  const project = meta.project as Project;
  const deployment = meta.deployment as Deployment;

  if (!isDeployment(content)) {
    throw {
      code: 400,
      message: 'Invalid deployment body.'
    }
  }

  const deploymentNdx = project.deployments.findIndex(d => d.hash === deployment.hash)

  const updatedDeployment = update(deployment, content);

  project.deployments[deploymentNdx] = updatedDeployment;

  meta.deployment = updatedDeployment;

  return;
}