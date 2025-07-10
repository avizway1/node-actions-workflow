FROM node:18-alpine3.20

# Create and set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci --omit=dev

# Remove build dependencies to reduce image size and attack surface
RUN apk del .gyp

# Copy app files
COPY . .

# Expose port
EXPOSE 3000

# Run the app
CMD ["node", "app.js"]
