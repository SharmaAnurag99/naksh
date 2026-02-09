FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci || npm install

COPY . .

ARG VITE_API_URL=http://localhost:3001
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

EXPOSE 3000

CMD ["npx", "serve", "-s", "dist", "-l", "3000"]

