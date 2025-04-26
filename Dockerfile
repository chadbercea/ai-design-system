FROM node:20

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json ./
RUN npm install

# Copy all files including index.html in the root
COPY . .

# Make sure the port is exposed
EXPOSE 5173

# Use the correct host binding
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]