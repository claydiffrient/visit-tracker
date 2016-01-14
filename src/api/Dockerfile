FROM node:5

EXPOSE 5000

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN wget https://github.com/Yelp/dumb-init/releases/download/v0.5.0/dumb-init_0.5.0_amd64.deb
RUN dpkg -i dumb-init_*.deb

RUN npm install

CMD ["dumb-init", "npm", "start"]