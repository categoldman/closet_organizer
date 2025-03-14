FROM node:20-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app
COPY --from=build /app ./

EXPOSE 3000
ENV NODE_ENV=production
ENV REACT_APP_API_URL=http://localhost:8081
CMD ["npm", "start"]
