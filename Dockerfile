# Contruyendo la aplicacion de React

FROM node:19-alpine3.16 AS react-builder
WORKDIR /app
COPY ./react/package*.json ./
RUN npm ci
COPY ./react ./
RUN npm run build

# Construyendo la aplicacion de Express

FROM node:19-alpine3.16
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
COPY --from=react-builder /app/dist ./saludofront-app/dist
EXPOSE 4000

CMD ["node", "index.js"]
