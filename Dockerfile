FROM node:8.6.0
LABEL maintainer InterWare

# docker, bluemix, local
ENV NODE_DEPLOY=docker
ENV APP=poc
ENV NODE_ENV=production
ENV LEVEL_LOG=DEBUG

ENV BACKEND_SERVER=http://127.0.0.1:8080/
ENV BACKEND_CAT=http:#127.0.0.1#8080


RUN mkdir -p /opt/app
COPY ./ /opt/app
RUN cd /opt/app && npm run build

WORKDIR /opt/app

CMD ["npm","run", "start"]
