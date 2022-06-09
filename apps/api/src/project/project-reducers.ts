import { Project } from '@runestone/interfaces';

export function update(project: Project, newProject: Partial<Project>): Project {
  return {
    ...project,
    ...newProject,
  };
}