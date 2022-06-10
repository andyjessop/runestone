import { Req } from "@andyjessop/cf-worker-server";
import { Deployment, Project } from "@runestone/interfaces";

export async function deleteDeployment(req: Req) {
  const project = req.meta.project as Project;
  const deployment = req.meta.deployment as Deployment;

  const deploymentNdx = project.deployments.findIndex(d => d.hash === deployment.hash);

  if (deploymentNdx === -1) {
    throw {
      code: 400,
      message: 'That deployment does not exist.'
    }
  }

  project.deployments.splice(deploymentNdx, 1);

  return;
}