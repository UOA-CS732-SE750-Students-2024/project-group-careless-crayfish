# Build stage for Backend
FROM node:latest AS backend-build
WORKDIR /usr/src/app/backend
COPY backend/package*.json ./
RUN npm ci --omit=dev
COPY backend/ .
# RUN npm run build

# Build stage for Frontend
FROM node:latest AS frontend-build
WORKDIR /usr/src/app/frontend
COPY frontend/package*.json ./
COPY frontend/ .

# Final stage
FROM node:20-alpine3.18
# Copy built assets from backend-build stage
COPY --from=backend-build /usr/src/app/backend/. /usr/src/app/backend
# Copy built assets from frontend-build stage
COPY --from=frontend-build /usr/src/app/frontend/dist /usr/src/app/frontend
# Copy .env from frontend-build stage
COPY --from=frontend-build /usr/src/app/frontend/.env /usr/src/app/frontend/

WORKDIR /usr/src/app

# Install serve to serve the frontend static files
RUN npm install -g serve

# Expose ports (backend port and frontend port)
EXPOSE 3000
EXPOSE 5000

# Run the backend and frontend
CMD ["sh", "-c", "node --env-file=./backend/.env ./backend/bin/www & serve -s frontend -l 5000"]
