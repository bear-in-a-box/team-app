import { ApiRestAction } from '../actions';
import { debug } from './debug';
import { auth } from './auth';

const actionsets: { [category: string]: ApiRestAction[] } = {
  debug,
  auth,
};

export const actionset: ApiRestAction[] = Object.entries(actionsets)
  .reduce<ApiRestAction[]>((total, [_key, set]) => [...total, ...set], []);
