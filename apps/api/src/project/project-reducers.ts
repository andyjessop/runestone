import { Project } from "../types";

export function update(project: Project, newProject: Partial<Project>): Project {
  return {
    ...project,
    ...newProject,
  };
}