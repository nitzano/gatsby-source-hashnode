FROM node:lts

WORKDIR /usr/src/app

COPY ["package.json","./"]
# COPY ["package.json", "yarn.lock","./"]

COPY packages/gatsby-source-hashnode/package.json ./packages/gatsby-source-hashnode/package.json
COPY packages/sample-site/package.json ./packages/sample-site/package.json
RUN yarn install --pure-lockfile --non-interactive

COPY . .
