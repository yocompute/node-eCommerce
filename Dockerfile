FROM node:16.2-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build
RUN ls -xl build
EXPOSE 8006
CMD ["node", "build/server.js"]