FROM node:lts

ARG GITHUB_PERSONAL_TOKEN 

WORKDIR /usr/src/app

# clone from git using deploy key
RUN git clone https://${GITHUB_PERSONAL_TOKEN}@github.com/nitzano/gatsby-source-hashnode.git

ENV NODE_ENV development

# Run and build
#RUN yarn install



CMD /bin/sh
