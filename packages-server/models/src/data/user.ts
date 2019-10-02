export type IdType = string | number;

export namespace Create {
  export interface Request extends Authenticate.Request {
    email: string;
  }
  
  export type Response = Authenticate.Response;
}

export namespace Read {
  export interface Request {
    id: IdType;
  }

  export interface Response {
  }
}

export namespace Update {
  export interface Request {
  }

  export interface Response {
  }
}

export namespace Delete {
  export interface Request {
    id: IdType;
  }

  export interface Response {
    success: boolean;
  }
}

export namespace Authenticate {
  export const TaskType = 'authenticate';

  export interface Request {
    login: string;
    password: string;
  }

  export type Response = {
    success: true;
    token: any;
  } | {
    success: false;
    errorCode: number;
  }
}

export namespace PermissionChallenge {
  export interface Request {
    userId: IdType;
    permissions: any[];
  }

  export interface Response {
    passed: boolean;
    allowed: any[];
    disallowed: any[];
  }
}
