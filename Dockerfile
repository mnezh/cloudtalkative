# Use the official Playwright base image with Node.js
# This includes all necessary dependencies for running Chromium, Firefox, and WebKit
FROM mcr.microsoft.com/playwright:v1.56.1-noble

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the working directory
# This allows caching of the node_modules layer
COPY package.json ./

# Install project dependencies
# Use --frozen-lockfile or ci if you have a lock file
RUN npm install

# Copy the rest of the application files
COPY . .

# Set default report directory environment variable, used by Playwright
ENV REPORT_DIR=/app/reports

# Set the entry point command (useful for Docker Compose or simple `docker run`)
# We default to running npm test, but users typically override this via the Makefile
ENTRYPOINT ["npm", "run"]
CMD ["test"]