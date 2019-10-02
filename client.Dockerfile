# Stage 1 - Build
FROM node:lts AS stage-build
WORKDIR /usr/src
COPY packages-client/client/package.json packages-client/client/yarn.lock packages-client/client/tsconfig.json ./
RUN yarn global add jest
RUN yarn --pure-lockfile
COPY packages-client/client/src ./src
COPY packages-client/client/public ./public
RUN yarn test
RUN yarn global remove jest
RUN yarn build

# Stage 2 - Production based on nginx
FROM nginx:1.17-alpine
COPY --from=stage-build /usr/src/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
