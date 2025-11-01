# Use Node.js
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json .
COPY vite.config.js .

# Install dependencies
RUN npm install

# Copy source code
COPY index.html .
COPY src ./src

# Expose port
EXPOSE 8080

# Start development server
CMD ["npm", "run", "dev"]