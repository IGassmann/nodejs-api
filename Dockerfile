FROM node:12 as build
WORKDIR /usr/src/app
COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive
COPY ./src ./
RUN yarn build

FROM node:12
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ./package.json ./yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive
COPY ./src ./
COPY --from=build /usr/src/app/dist/ ./dist
CMD ["yarn", "start"]
