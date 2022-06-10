import { error, missing, server } from '@andyjessop/cf-worker-server';
import { APIError } from '@runestone/interfaces';
import { kv as createKV, KV } from '@runestone/kv';
import * as projectMiddlewares from './projects/middlewares';
import * as projectHandlers from './projects/handlers';
import * as envMiddlewares from './environments/middlewares';
import * as envHandlers from './environments/handlers';
import * as entryMiddlewares from './entries/middlewares';
import * as entryHandlers from './entries/handlers';
import * as deploymentMiddlewares from './deployments/middlewares';
import * as deploymentHandlers from './deployments/handlers';
import * as handlers from './handlers';

interface WorkerService {
  fetch: (request?: Request, env?: Env) => Promise<Response>;
}

interface Env {
  KV: KVNamespace;
  CDN: WorkerService;
}

export default {
  fetch,
}

async function fetch(request: Request, env: Env): Promise<unknown> {
  const kv = createKV(env.KV);

  return app.handle(request, kv).catch((err: APIError) => {
    return error(err.code, err.message);
  });
}

const app = server<[KV]>();

/**
 * PROJECTS
 * ========
 */

app.get(
  '/projects',
  projectHandlers.getAll
);

app.get(
  '/projects/:name',
  projectMiddlewares.withProject,
  projectHandlers.getOne
);

app.post(
  '/projects',
  projectMiddlewares.withNewProject,
  projectMiddlewares.saveProject,
  projectHandlers.getOne,
);

app.put(
  '/projects/:name',
  projectMiddlewares.withUpdatedProject,
  projectMiddlewares.saveProject,
  projectHandlers.getOne,
);

app.delete(
  '/projects/:name',
  projectMiddlewares.withProject,
  projectMiddlewares.deleteProject,
  handlers.ok,
);

/**
 * ENVIRONMENTS
 * ============
 */

app.get(
  '/projects/:name/environments',
  projectMiddlewares.withProject,
  envHandlers.getAll,
);

app.get('/projects/:name/environments/:env',
  projectMiddlewares.withProject,
  envMiddlewares.withEnv,
  envHandlers.getOne  
);
 
app.post(
  '/projects/:name/environments',
  projectMiddlewares.withProject,
  envMiddlewares.withNewEnv,
  projectMiddlewares.saveProject,
  envHandlers.getOne,
);
 
app.put(
  '/projects/:name/environments/:env',
  projectMiddlewares.withProject,
  envMiddlewares.withUpdatedEnv,
  projectMiddlewares.saveProject,
  envHandlers.getOne
);
 
app.delete(
  '/projects/:name/environments/:env',
  projectMiddlewares.withProject,
  envMiddlewares.withEnv,
  envMiddlewares.deleteEnv,
  projectMiddlewares.saveProject,
  handlers.ok,
);

/**
 * ENTRIES
 * =======
 */

 app.get(
  '/projects/:name/entries',
  projectMiddlewares.withProject,
  entryHandlers.getAll,
);

app.get('/projects/:name/entries/:id',
  projectMiddlewares.withProject,
  entryMiddlewares.withEntry,
  entryHandlers.getOne  
);
 
app.post(
  '/projects/:name/entries',
  projectMiddlewares.withProject,
  entryMiddlewares.createEntry,
  projectMiddlewares.saveProject,
  entryHandlers.getOne,
);
 
app.put(
  '/projects/:name/entries/:id',
  projectMiddlewares.withProject,
  entryMiddlewares.withEntry,
  entryMiddlewares.updateEntry,
  projectMiddlewares.saveProject,
  entryHandlers.getOne
);
 
app.delete(
  '/projects/:name/entries/:id',
  projectMiddlewares.withProject,
  entryMiddlewares.withEntry,
  entryMiddlewares.deleteEntry,
  projectMiddlewares.saveProject,
  handlers.ok,
);

/**
 * DEPLOYMENTS
 * ===========
 */

 app.get(
  '/projects/:name/deployments',
  projectMiddlewares.withProject,
  deploymentHandlers.getAll,
);

app.get('/projects/:name/deployments/:hash',
  projectMiddlewares.withProject,
  deploymentMiddlewares.withDeployment,
  deploymentHandlers.getOne  
);
 
app.post(
  '/projects/:name/deployments',
  projectMiddlewares.withProject,
  deploymentMiddlewares.createDeployment,
  projectMiddlewares.saveProject,
  deploymentHandlers.getOne,
);
 
app.put(
  '/projects/:name/deployments/:hash',
  projectMiddlewares.withProject,
  deploymentMiddlewares.withDeployment,
  deploymentMiddlewares.updateDeployment,
  projectMiddlewares.saveProject,
  deploymentHandlers.getOne
);
 
app.delete(
  '/projects/:name/deployments/:hash',
  projectMiddlewares.withProject,
  deploymentMiddlewares.withDeployment,
  deploymentMiddlewares.deleteDeployment,
  projectMiddlewares.saveProject,
  handlers.ok,
);

/**
 * CATCH-ALL/404
 * =============
 */

app.get('*', async () => {
  return missing('URL not found.');
});