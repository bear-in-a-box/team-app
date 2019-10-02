import { connectToBus, BusType } from '@team-app/ipc';
import { Data } from '@team-app/models';
import { objects } from '@team-app/shared-utils';

import { ApiRestAction } from '../actions';

const messageBus = connectToBus({ type: BusType.Api });

export const auth: ApiRestAction[] = [
  new ApiRestAction({
    type: 'auth-login',
    method: 'post',
    route: '/login',
    handler: async (req, res) => {
      const body: Data.User.Authenticate.Request = req.body;
      const taskData = objects.pick(body, ['login', 'password']);
      const result = await messageBus.postAndWait<
        Data.User.Authenticate.Request,
        Data.User.Authenticate.Response
      >({
        data: taskData,
        type: Data.User.Authenticate.TaskType
      });
      if (result.success === true) {
        const { token } = result;
        res.status(200).json({ token });
      } else {
        const { errorCode } = result;
        res.status(401).json({ errorCode });
      }
    }
  })
];
