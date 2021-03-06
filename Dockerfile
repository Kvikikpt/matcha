FROM node:14
# Create app directory
RUN mkdir  -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY back/package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY back/ .

EXPOSE 3000

CMD [ "npm", "install", "-g", "pm2" ]
CMD [ "npm", "run", "pm2" ]
