import { Express } from 'express';
import { ApiActions, ApiAction, ApiActionOptions } from '../actions';

type ExpressActionHandler = (req: Express.Request, res: Express.Response, next: () => void) => void;
type AllowedRestMethod = 'get' | 'post' | 'put' | 'delete';

interface ApiRestActionOptions extends ApiActionOptions<ExpressActionHandler> {
  readonly type: string,
  readonly method: AllowedRestMethod,
  readonly route: string,
  readonly handler: ExpressActionHandler,
  readonly middlewares?: ExpressActionHandler[],
  readonly allowedInProduction: boolean
}

export class ApiRestAction extends ApiAction<ExpressActionHandler> implements ApiRestActionOptions {
  readonly method: AllowedRestMethod;
  readonly route: string;
  readonly middlewares: ExpressActionHandler[];
  
  constructor({
    type,
    method = 'get',
    route,
    handler,
    middlewares = [],
    allowedInProduction = true
  }: ApiRestActionOptions) {
    super({ type, handler, allowedInProduction });
    
    this.method = method;
    this.route = route;
    this.middlewares = [...middlewares];
  }
}


export class ApiRestActions extends ApiActions<Express, ApiRestAction> {
  bind() {
    this.actions.forEach(
      ({ route, method, middlewares, handler }) => this.target[method](route, ...middlewares, handler)
    )
    return this;
  }

  unbind() {
    // This one doesn't apply here. No-op method.
    return this;
  }
}
