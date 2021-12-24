FROM node
ENV NODE_ENV=production
WORKDIR /
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . . 
RUN npm run react-build 
EXPOSE 8080
CMD ["npm", "run", "start"]