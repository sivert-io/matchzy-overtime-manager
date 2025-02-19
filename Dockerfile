FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Copy environment configuration
COPY .env .env

# Build TypeScript code
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]