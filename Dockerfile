FROM node:18-alpine3.20

# Create and set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy app files
COPY . .

# Expose port
EXPOSE 3000

# Run the app
CMD ["node", "app.js"]
