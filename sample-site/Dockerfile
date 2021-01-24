FROM node:lts

WORKDIR /app
RUN yarn global add gatsby-cli
ADD ["package.json", "yarn.lock", "./"]
RUN yarn
ADD . . 
CMD gatsby develop -H 0.0.0.0