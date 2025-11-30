# ---------- BUILD STAGE ----------
FROM node:20-alpine AS builder

WORKDIR /app

# 1) najprej samo package datoteke (zaradi cache)
COPY package*.json ./

# 2) namestimo vse odvisnosti (tudi dev – jih rabimo za build)
RUN npm ci

# 3) kopiramo config + source
COPY tsconfig*.json nest-cli.json ./
COPY src ./src

# 4) buildamo v dist/
RUN npm run build

# 5) odstranimo dev odvisnosti, da bo runtime manjši
RUN npm prune --omit=dev


# ---------- RUNTIME STAGE ----------
FROM node:20-alpine

WORKDIR /app
ENV NODE_ENV=production

# skopiramo že pripravljene node_modules in build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# port iz .env (APP_PORT), fallback 3000
ENV APP_PORT=3000
EXPOSE 3000

CMD ["node", "dist/main.js"]
