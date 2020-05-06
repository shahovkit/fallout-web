FROM node:12

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

RUN npm install -g nodemon

COPY package*.json .

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8802

CMD [ "nodemon", "app.js" ]