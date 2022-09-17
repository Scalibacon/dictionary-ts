FROM node:16 as api

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install

COPY . .

CMD npm run dev