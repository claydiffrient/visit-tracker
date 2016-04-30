FROM node:6.0.0
EXPOSE 5000

ENV APP_HOME /usr/src/app

RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME
ADD . $APP_HOME

RUN wget https://github.com/Yelp/dumb-init/releases/download/v0.5.0/dumb-init_0.5.0_amd64.deb
RUN dpkg -i dumb-init_*.deb

RUN npm install
RUN npm run api-docs

CMD ["dumb-init", "npm", "start"]