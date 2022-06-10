import { Handler, Methods, Req, Route, Server } from "./types";

export function server<T extends any[]>(base = '', routes: Route<T>[] = []): Server<T> {
  return {
    ...createMethods<T>(base, routes),
    routes,
    handle,
  };

  async function handle(request: Request, ...args: T) {
    const url = new URL(request.url);
    const req = request.clone() as Req;
    
    req.request = request;
    req.content = undefined;

    try {
      if (request.headers.get('content-type')?.includes('application/json')) {
        req.content = await request.json();
      }
    } catch (err) {
      // fail silently
    }

    req.cookies = {};

    try {
      req.cookies = (req.headers.get('Cookie') || '')
        .split(/;\s*/)
        .map(pair => pair.split(/=(.+)/))
        .reduce((acc, [key, value]) => {
          acc[key] = value;

          return acc
        }, {} as Record<string, string>)
    } catch (err) {
      // fail silently
    }

    req.meta = {};
    req.query = Object.fromEntries(url.searchParams);

    for (const [method, route, handlers] of routes) {
      if ((method === req.method || method === 'ALL')) {
        const match = url.pathname.match(route);
        console.log(match, url.pathname, String(route));

        if (!match) {
          continue;
        }

        if (match.groups) {
          req.params = match.groups;
        }
        
        for (const handler of handlers) {
          const response = await handler(req, ...args);

          if (response) {
            return response;
          }
        }          
      }
    }

    return new Response('No matching route');
  }
}

function createMethods<T extends any[]>(base = '', routes: Route<T>[] = []) {
  return (['delete', 'get', 'head', 'options', 'patch', 'post', 'put'] as Methods[])
  .reduce((acc, prop) => {
    acc[prop] = (path: string, ...handlers: Handler<T>[]) => {
      routes.push(getRoute(prop, base, path, handlers));
    };

    return acc;
  }, {} as {
    [K in Methods]: (path: string, ...handlers: Handler<T>[]) => void;
  })
}

function getRoute<T extends any[]>(prop: string, base: string, path: string, handlers: Handler<T>[]) {
  return [
    prop.toUpperCase(),
    RegExp(`^${(base + path)
      .replace(/(\/?)\*/g, '($1.*)?')                             // trailing wildcard
      .replace(/\/$/, '')                                         // remove trailing slash
      .replace(/:(\w+)(\?)?(\.)?/g, '$2(?<$1>[^/]+)$2$3')         // named params
      .replace(/\.(?=[\w(])/, '\\.')                              // dot in path
      .replace(/\)\.\?\(([^[]+)\[\^/g, '?)\\.?($1(?<=\\.)[^\\.') // optional image format
    }/*$`),
    handlers,
  ] as Route<T>;
} 