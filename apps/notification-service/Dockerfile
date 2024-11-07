# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml from the root of the monorepo
# to the working directory inside the container
COPY ../pnpm-lock.yaml ./pnpm-lock.yaml
COPY ../package.json ./package.json

# Install the dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the entire service directory (e.g., user-service or notification-service)
# into the container
COPY ./src ./src
COPY ./tsconfig.json ./tsconfig.json
COPY ./nest-cli.json ./nest-cli.json
COPY ./libs ./libs

# Build the application
RUN pnpm run build

# Expose the port the app will run on
EXPOSE 3000

# Command to run the application
CMD ["pnpm", "run", "start:prod"]
