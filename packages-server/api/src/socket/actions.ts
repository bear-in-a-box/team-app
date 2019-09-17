import { Socket } from "socket.io";

export class ApiSocketAction<DataModel = any> {
  constructor(
    readonly type: string,
    readonly handler: (socket: Socket, data: DataModel) => void,
    readonly allowedInProduction: boolean = false
  ) {}
}

export const actions: Readonly<ApiSocketAction[]> = Object.freeze([
]);
