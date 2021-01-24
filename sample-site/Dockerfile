FROM node:lts

RUN yarn global add gatsby-cli
WORKDIR /app
ADD . ./
RUN yarn
CMD gatsby develop