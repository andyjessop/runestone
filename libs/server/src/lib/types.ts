export type Handler<T extends any[]> = (request: Req, ...args: T) => Promise<Response | void>;
export type FetchHandler<T extends any[]> = (request: Request, ...args: T) => Promise<Response | void>;

export type Route<T extends any[]> = [string, RegExp, Handler<T>[]];

export interface Req extends Request {
  cookies: Record<string, string>;
  content: any;
  query: Record<string, string>;
  params: Record<string, string>;
  meta: Record<string, any>;
};

export type RouteConfig<T extends any[]> = (path: string, ...args: Handler<T>[]) => void;

export enum Methods {
  delete = 'delete', get = 'get', head = 'head', options = 'options', patch = 'patch', post = 'post', put = 'put'
}

type MethodConfigs<T extends any[]> = {
  [K in Methods]: (path: string, ...handlers: Handler<T>[]) => void;
}
export interface Server<T extends any[]> extends MethodConfigs<T> {
  routes: Route<T>[];
  handle: FetchHandler<T>;
}