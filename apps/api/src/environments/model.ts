import { Environment } from '@runestone/interfaces';

export function create(name: string, env: Partial<Environment>): Environment {
  return {
    name,
    features: [],
    variables: [],
    ...env,
  };
}

export function update(env: Environment, newEnv: Partial<Environment>): Environment {
  return {
    ...env,
    ...newEnv,
  };
}