import { CreateEntry, Deployment, Entry, Environment, Feature, Project, Variable } from "@runestone/interfaces";
import { isArrayOfType, isNumber, isString } from "@runestone/utils";

export function buildProjectStateKey(projectName: string): string {
  return `project:${projectName}:state`;
}

export function getProjectNameFromStateKey(key: string): string {
  return key.split(':')[1];
}

export function isDeployment(value: any): value is Deployment {
  return Boolean(
    isArrayOfType(value.assets, isString) &&
    isNumber(value.created) &&
    isString(value.hash) &&
    isString(value.html) &&
    Object.keys(value).length > 3 &&
    Object.keys(value).length < 7
  )
}

export function isEnvironment(value: any): value is Environment {
  return Boolean(
    isString(value.name) &&
    isArrayOfType(value.features, isFeature) &&
    isArrayOfType(value.variables, isVariable) &&
    Object.keys(value).length === 3
  );
}

export function isFeature(value: any): value is Feature {
  return (
    isString(value.name) &&
    isString(value.value) &&
    Object.keys(value).length === 2
  );
}

export function isProject(value: any): value is Project {
  return Boolean(
    isString(value.name) &&
    isArrayOfType(value.deployments, isDeployment) &&
    isArrayOfType(value.entries, isEntry) &&
    isArrayOfType(value.envs, isEnvironment) &&
    Object.keys(value).length === 4
  );
}

export function isEntry(value: any): value is Entry {
  return Boolean(
    isString(value.deploymentHash) &&
    isString(value.envName) &&
    isArrayOfType(value.baseUrls, isString) &&
    isArrayOfType(value.features, isFeature) &&
    isArrayOfType(value.variables, isVariable) &&
    Object.keys(value).length === 6
  );
}

export function isCreateEntry(value: any): value is CreateEntry {
  return Boolean(
    isString(value.deploymentHash) &&
    isString(value.envName) &&
    isString(value.id) &&
    isArrayOfType(value.baseUrls, isString) &&
    (!value.features || isArrayOfType(value.features, isFeature)) &&
    (!value.variables || isArrayOfType(value.variables, isVariable)) &&
    Object.keys(value).length > 3 &&
    Object.keys(value).length < 7
  );
}

export function isVariable(value: any): value is Variable {
  return (
    isString(value.name) &&
    isString(value.value) &&
    Object.keys(value).length === 2
  );
}