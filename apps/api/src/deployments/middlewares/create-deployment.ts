import { Req } from "@andyjessop/cf-worker-server";
import { Project } from "@runestone/interfaces";
import { isDeployment } from "@runestone/utils";

export async function createDeployment(req: Req) {
  const { content, meta } = req;
  const project = meta.project as Project;

  if (!isDeployment(content)) {
    throw {
      code: 400,
      message: 'Invalid entry body.'
    }
  }

  const deployment = content;

  if (project.deployments.find(e => e.hash === deployment.hash)) {
    throw {
      code: 400,
      message: 'That deployment already exists.'
    }
  }

  project.deployments.push(deployment);

  meta.deployment = deployment;

  return;
}