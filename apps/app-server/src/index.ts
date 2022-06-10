import { error, html, Req, server } from '@andyjessop/cf-worker-server';
import { APIError, Deployment, Environment, Feature, Project, Variable } from '@runestone/interfaces';
import { kv as createKV, KV } from '@runestone/kv';
import { withDeployment } from './middlewares/with-deployment';
import { withEntry } from './middlewares/with-entry';
import { withEnv } from './middlewares/with-env';
import { withFeatures } from './middlewares/with-features';
import { withProject } from './middlewares/with-project';
import { withVariables } from './middlewares/with-variables';

const projectName = 'runestone-app-client';

interface WorkerService {
  fetch: (request?: Request, env?: Env) => Promise<Response>;
}

interface Env {
  KV: KVNamespace;
  CDN: WorkerService;
}

export default {
  fetch: handleFetch,
}

async function handleFetch(request: Request, env: Env): Promise<unknown> {
  const kv = createKV(env.KV);

  const test = await env.CDN.fetch(request);

  console.log(test);

  return app.handle(request, kv, env.CDN).catch((err: APIError) => {
    return error(err.code, err.message);
  });
}

const app = server<[KV, Env['CDN']]>();

app.get('/assets', async (req: Req, kv, cdn) => {
  return cdn.fetch(req.request);
});

app.get(
  '*',
  withProject(projectName),
  withEntry,
  withEnv,
  withDeployment,
  withFeatures,
  withVariables,
  async (req: Req) => {
    const { name } = req.meta.project as Project;
    const env = req.meta.env as Environment;
    const deployment = req.meta.deployment as Deployment;
    const features = req.meta.features as Feature[];
    const variables = req.meta.variables as Variable[];

    const htmlResponse = await fetch(deployment.html);

    if (!htmlResponse) {
      throw {
        code: 404,
        message: 'HTML asset not found',
      }
    }

    const htmlText = await htmlResponse.text();
  
    const scriptTag = buildScriptTag(env.name, features, variables, name, deployment);
  
    const withReplacements = htmlText
      .replace(SCRIPT, scriptTag);

    return html(replaceVariables(variables, withReplacements));
  },
);

const SCRIPT = '<!--RUNESTONE_SCRIPT-->';

function buildScriptTag(env: string, features: Feature[], variables: Variable[], key: string, deployment: Deployment) {
  return `
  <script type="text/javascript">
      if (!window.${key}) window.${key} = {};
      window.${key}Env = '${env}';
      window.${key}.features = {${features.map((f) => `${f.name}: true`).join(', ')}}
      window.${key}.variables = {${variables.map((v) => `${v.name}: "${v.value}"`).join(', ')}}
      window.${key}.deployment = JSON.parse(${JSON.stringify(deployment)})
  </script>
  `
}

function replaceVariables(variables: Variable[], str: string) {
  const variablesAsObj = variables.reduce((acc, cur) => {
    acc[cur.name] = cur.value;
    return acc;
  }, {} as Record<string, string>);

  const matches = str.matchAll(/%[\s\S]*?%/g);

  let final = str;

  for (const match of matches) {
    const key = match[0].slice(1, -1);

    if (variablesAsObj[key]) {
      final = final.replace(match[0], variablesAsObj[key])
    }
  }

  return final;
}