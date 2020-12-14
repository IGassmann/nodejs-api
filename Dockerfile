FROM node:12.19.1 as build
WORKDIR /usr/src/app
COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive
COPY ./ ./
RUN yarn build

FROM node:12.19.1
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive
COPY ./ ./
COPY --from=build /usr/src/app/dist/ ./dist
CMD ["yarn", "start"]
