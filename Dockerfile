# syntax=docker/dockerfile:1

# ---- Build stage -----------------------------------------------------------
FROM node:20-alpine AS build
WORKDIR /app

# Install from the lockfile first for reproducible, cacheable installs.
COPY package.json package-lock.json ./
RUN npm ci

# Type-check + bundle the SPA → /app/dist.
COPY . .
RUN npm run build

# ---- Runtime stage ---------------------------------------------------------
FROM nginx:1.27-alpine AS runtime

# Origin that the /api/ location proxies to. NO trailing slash.
# Override at runtime, e.g. -e BACKEND_URL=http://my-host:8080
ENV BACKEND_URL=http://backend:8080

# The nginx image runs envsubst over *.template on start, expanding ${BACKEND_URL}.
COPY default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
# The base image's default ENTRYPOINT/CMD starts nginx in the foreground.
