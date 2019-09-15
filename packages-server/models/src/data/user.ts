export type IdType = string | number;

export namespace Create {
  export interface Request {
  }
  
  export interface Response {
  }
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
