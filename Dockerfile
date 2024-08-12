# Use the official Bun image as a parent image
FROM oven/bun:latest

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . .

# Install any needed packages specified in package.json
# If you have dependencies, uncomment the next line
# RUN bun install

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run websocket-server.js when the container launches
CMD ["bun", "run", "index.js"]