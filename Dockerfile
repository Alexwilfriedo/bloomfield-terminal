# ──────────────────────────────────────────────────────────────
# Bloomfield Terminal — production Docker image
#
# Two stages:
#   1. builder — node:20-alpine, installs deps and runs `vite build`
#   2. runtime — nginx:alpine, serves the compiled static SPA only
#
# Final image is ~45 MB (nginx + ~2 MB of dist/), vs ~350 MB if we
# shipped node + node_modules + serve alongside the built bundle.
# ──────────────────────────────────────────────────────────────

# ─── Stage 1 · Builder ────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install only production build prerequisites. We copy package files
# first so this layer is cached when source code (but not deps) changes.
COPY package.json package-lock.json ./
RUN npm ci --include=dev

# Copy the source tree and build. .dockerignore keeps node_modules,
# .git, dist, etc. out of the build context.
COPY . .

# Raise Node's heap so Vite's minifier can cope with recharts + d3.
ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build


# ─── Stage 2 · Runtime ────────────────────────────────────────
FROM nginx:alpine AS runtime

# Copy the compiled SPA into nginx's web root
COPY --from=builder /app/dist /usr/share/nginx/html

# SPA routing + gzip config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Railway injects PORT; nginx reads it via envsubst at container start.
ENV PORT=80
EXPOSE 80

# Rewrite the listen directive at boot using the $PORT env var, then
# run nginx in the foreground.
CMD ["/bin/sh", "-c", "envsubst '$PORT' < /etc/nginx/conf.d/default.conf > /etc/nginx/conf.d/default.conf.tmp && mv /etc/nginx/conf.d/default.conf.tmp /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
