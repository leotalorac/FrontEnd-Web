FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

COPY . /usr/src/app

RUN npm install -g http-server

EXPOSE 80

CMD ["http-server","/usr/src/app/build","-p","80"]
