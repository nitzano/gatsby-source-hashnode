FROM node:lts

ARG GITHUB_PERSONAL_TOKEN 
ARG GIT_USER_NAME
ARG GIT_USER_EMAIL

WORKDIR /usr/src/app

# clone from git using deploy key
RUN git clone https://${GITHUB_PERSONAL_TOKEN}@github.com/nitzano/gatsby-source-hashnode.git

WORKDIR /usr/src/app/gatsby-source-hashnode

RUN git config user.name "${GIT_USER_NAME}"
RUN git config user.email ${GIT_USER_EMAIL}

# build
RUN yarn install

RUN NODE_ENV=production yarn build

CMD /bin/sh
