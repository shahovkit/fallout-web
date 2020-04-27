FROM node:10


RUN mkdir -p /app/node_modules && chown -R node:node /app

RUN mkdir -p /app1/test/

WORKDIR /app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8802

CMD [ "node", "app.js" ]