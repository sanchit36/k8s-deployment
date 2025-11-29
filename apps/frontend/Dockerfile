FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy the already-built Next.js output from CI
COPY .next/standalone ./
COPY .next/static ./public/_next/static
COPY public ./public

EXPOSE 3000

CMD ["node", "server.js"]
