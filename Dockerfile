# Build stage
FROM node:22-alpine AS build

WORKDIR /src
COPY package.json .
RUN yarn install
COPY . .

RUN npm run build

# Production stage
FROM build AS production

COPY --from=build /src/.next ./.next
COPY --from=build /src/node_modules ./node_modules
COPY --from=build /src/package.json ./package.json
COPY --from=build /src/public ./public

CMD npm start