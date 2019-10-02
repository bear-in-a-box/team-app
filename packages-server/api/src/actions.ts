import { env } from '@team-app/shared-utils';

export interface ApiActionOptions<Handler> {
  readonly type: string;
  readonly handler: Handler;
  readonly allowedInProduction?: boolean;
}

export class ApiAction<Handler extends Function = () => void> implements ApiActionOptions<Handler> {
  readonly type: string;
  readonly handler: Handler;
  readonly allowedInProduction: boolean;

  constructor({
    type,
    handler,
    allowedInProduction = true
  }: ApiActionOptions<Handler>) {
    this.type = type;
    this.handler = handler;
    this.allowedInProduction = allowedInProduction;
  }
}

export abstract class ApiActions<Target, Action extends ApiAction<any> = ApiAction<any>> {
  protected readonly actions: Action[] = [];

  constructor(protected readonly target: Target, actions?: Action[]) {
    if (actions != null && Array.isArray(actions)) {
      actions.forEach(this.add);
    }
  }

  public add(action: Action): this {
    if (
      !env.isProduction() ||
      (env.isProduction() && action.allowedInProduction)
    ) {
      this.actions.push(action);
    }
    return this;
  }

  public abstract bind(): this;
  public abstract unbind(): this;
}
