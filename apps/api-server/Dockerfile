# Use a small, production-ready Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json first to cache npm install layers
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy rest of your source code
COPY . .

# Set environment variables
ENV NODE_ENV=production

# Expose your API port
EXPOSE 8000

# Start the server
CMD ["node", "server.js"]
