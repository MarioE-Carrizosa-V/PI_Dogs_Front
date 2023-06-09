# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Copy the index.html file to the public directory
RUN cp client/public/index.html public/

# Expose a port (if your application requires it)
EXPOSE 3000

# Set the command to run the application
CMD [ "npm", "start" ]
