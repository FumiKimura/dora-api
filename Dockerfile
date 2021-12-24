FROM node:14.16.0
ENV NODE_ENV=production
WORKDIR /
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . . 
RUN npm run react-build 
EXPOSE 8080
CMD ["npm", "run", "start"]