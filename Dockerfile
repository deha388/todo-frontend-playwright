# Use Node.js 18 Alpine as base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install production dependencies only (for final runtime)
COPY package.json package-lock.json* ./
RUN npm ci --only=production --no-audit --no-fund --maxsockets 1 --silent --prefer-offline

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
# Install ALL dependencies (including devDependencies for TypeScript build)
COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund --maxsockets 1 --silent --prefer-offline
COPY . .

# Disable Next.js telemetry to reduce log noise
ENV NEXT_TELEMETRY_DISABLED 1

# Build the application - let Node.js manage memory naturally
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"] 