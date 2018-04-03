FROM node:carbon

WORKDIR /usr/src/saudify

# copy app definition files
COPY package*.json ./

# Install dependencies
RUN npm install

# copy app source
COPY . .

# Create certs
RUN npm run ssl

# TODO: Refactor enviroment definition
ENV SERVER_PORT=3000
# set to production because .env
ENV NODE_ENV=production

CMD [ "npm", "start" ]
