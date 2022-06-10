import { Deployment } from '@runestone/interfaces';

export function update(deployment: Deployment, newDeployment: Partial<Deployment>): Deployment {
  return {
    ...deployment,
    ...newDeployment,
  };
}