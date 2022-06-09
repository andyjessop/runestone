# cloudflare

This package enables you to generate a Cloudflare Worker inside an Nx monorepo. 

## Installation

It's dead easy. First, install the package from within your Nx monorepo:

```
npm i @andyjessop/cloudflare
```

Next, create your worker:

```
npx nx g @andyjessop/cloudflare:worker my-worker
```

There's just one more thing. You need to create an API token via the Cloudflare `dashboard > My Profile > API Tokens` (make sure you give it editing capabilities for workers, KV, and R2 as well if you're planning on using those).

There's a `.env.example` in the generated app folder. Copy that to a new `.env` file and fill in your account id (it's the string in the URL, e.g. dash.cloudflare.com/this-is-my-id/workers) and API token.

That's it. Now you can run it locally...

```
npx nx serve my-worker // serves worker using wrangler at localhost:8787
```

...or deploy it to your workers.dev 

```
npx nx deploy my-worker // deploys to `my-worker.your-account-name.workers.dev`
```