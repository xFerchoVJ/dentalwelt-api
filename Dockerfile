FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Copiar las migraciones de Prisma
COPY prisma/ ./prisma/

# Ejecutar prisma generate y prisma migrate deploy
RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]