export interface Deployment {
  assets: string[];
  created: number;
  hash: string;
  html: string;
  meta?: Record<string, unknown>;
  subdomain?: string;
}

export interface Environment {
  activeDeployment: string;
  baseUrl: string;
  features: Record<string, number>;
  name: string;
  variables: Record<string, string>;
}

export interface Feature {
  name: string;
}

export interface Variable {
  name: string;
  value: string;
}

export interface Project {
  name: string;
  deployments: Deployment[];
  envs: Environment[];
  features: Feature[];
  variables: Variable[];
}

export interface APIError {
  code: number,
  message: string
}