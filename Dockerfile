FROM node:18 AS builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build
FROM node:18
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./
RUN yarn install --only=production
EXPOSE 3000
CMD ["node", "dist/index.js"]
