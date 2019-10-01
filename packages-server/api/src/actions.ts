import { env } from '@team-app/shared-utils';

export class ApiAction<Handler extends Function = () => void> {
  constructor(
    public readonly type: string,
    public readonly handler: Handler,
    public readonly allowedInProduction: boolean = true
  ) {}
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
