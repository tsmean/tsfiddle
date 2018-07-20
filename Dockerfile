FROM node:8

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY tsconfig.json /app/tsconfig.json
COPY src /app/src
WORKDIR /app
RUN npm install
RUN npm run build
ENV NODE_ENV production

EXPOSE 5638

CMD ["npm", "run", "start:prod"]
