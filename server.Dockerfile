FROM keymetrics/pm2:latest-alpine

COPY ./packages-server ./packages-server/
COPY package.json lerna.json ./

RUN npm install -g yarn
RUN npm config set unsafe-perm true
RUN yarn config set unsafe-perm true
RUN yarn global add typescript lerna typeorm
RUN yarn
RUN lerna bootstrap --hoist
RUN lerna run test
RUN yarn config set unsafe-perm false
RUN npm config set unsafe-perm false

COPY ormconfig.env server-runner.sh pm2.json ./

RUN chmod 777 server-runner.sh

EXPOSE 3000

CMD [ "sh", "-c", "./server-runner.sh" ]
