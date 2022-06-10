import { Project } from '@runestone/interfaces';

export function create(name: string, project: Partial<Project>): Project {
  return {
    name,
    deployments: [],
    entries: [],
    envs: [],
    ...project,
  };
}

export function update(project: Project, newProject: Partial<Project>): Project {
  return {
    ...project,
    ...newProject,
  };
}