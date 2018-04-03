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
