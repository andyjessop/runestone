import { Project } from "../types";

export function create(name: string, project: Partial<Project>): Project {
  return {
    name,
    deployments: [],
    envs: [],
    features: [],
    variables: [],
    ...project
  };
}