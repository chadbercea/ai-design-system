# Use Node image
FROM node:20

# Set working directory
WORKDIR /Users/chadbercea/Github/ai-design-system

# Copy files
COPY package.json package-lock.json ./
RUN npm install

# Copy all source code
COPY . .

# Expose Vite default port
EXPOSE 5173

# Start Vite
CMD ["npm", "run", "dev", "--", "--host"]