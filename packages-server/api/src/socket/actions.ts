import { Socket } from 'socket.io';
import { ApiActions } from '../actions';

export class ApiSocketActions extends ApiActions<Socket> {
  bind() {
    this.actions.forEach(
      ({ type, handler }) => this.target.on(type, handler)
    );
    return this;
  }

  unbind() {
    this.actions.forEach(
      ({ type, handler }) => this.target.off(type, handler)
    );
    return this;
  }
}
