FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies required for build and tsx)
RUN npm ci

# Copy application code
COPY . .

# Build the Vite application
RUN npm run build

# Expose the port Cloud Run will use
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Start the server
CMD ["npx", "tsx", "server.ts"]
