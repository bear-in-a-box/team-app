import { Express } from 'express';
import { ApiActions, ApiAction } from '../actions';

type ExpressActionHandler = (req: Express.Request, res: Express.Response) => void;
type AllowedRestMethods = 'get' | 'post' | 'put' | 'delete';

export class ApiRestAction extends ApiAction<ExpressActionHandler> {
  constructor(
    public readonly type: string,
    public readonly method: AllowedRestMethods,
    public readonly route: string,
    public readonly handler: ExpressActionHandler,
    public readonly allowedInProduction: boolean = true
  ) {
    super(type, handler, allowedInProduction);
  }
}


export class ApiRestActions extends ApiActions<Express, ApiRestAction> {
  bind() {
    this.actions.forEach(
      ({ route, method, handler }) => this.target[method](route, handler)
    )
    return this;
  }

  unbind() {
    // This one doesn't apply here. No-op method.
    return this;
  }
}
