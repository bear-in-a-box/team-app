FROM keymetrics/pm2:latest-alpine

COPY ./packages-server ./packages-server/
COPY package.json lerna.json pm2.json ./

RUN npm install -g yarn
RUN npm config set unsafe-perm true
RUN yarn config set unsafe-perm true
RUN yarn global add typescript lerna
RUN yarn
RUN lerna bootstrap --hoist
RUN lerna run test
RUN yarn config set unsafe-perm false
RUN npm config set unsafe-perm false

ENV API_PORT 3000
ENV NODE_ENV production

EXPOSE 3000

CMD [ "pm2-runtime", "start", "pm2.json" ]
