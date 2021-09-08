FROM node:lts
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock","./"]
RUN yarn install --silent --ignore-scripts
COPY . .
CMD /bin/sh
