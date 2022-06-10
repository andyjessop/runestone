export interface APIError {
  code: number,
  message: string
}

export interface Deployment {
  assets: string[];
  hash: string;
  html: string;
  meta?: Record<string, unknown>;
}

export interface Environment {
  features: Feature[];
  name: string;
  variables: Variable[];
}

export interface Feature {
  name: string;
  value: number;
}

export interface Project {
  name: string;
  deployments: Deployment[];
  entries: Entry[];
  envs: Environment[];
}

export interface Entry extends CreateEntry {
  features: Feature[];
  variables: Variable[];
}

export interface CreateEntry {
  deploymentHash: string;
  baseUrls: string[];
  envName: string;
  id: string;
  features?: Feature[];
  variables?: Variable[];
}

export interface Variable {
  name: string;
  value: string;
}

