#!/bin/bash

# Name of your app
APP_NAME="cs732-careless-crayfish"

# Docker image name
IMAGE_NAME="$APP_NAME:latest"

# Build the Docker image
docker build -t $IMAGE_NAME .

# Check if the image was built successfully
if [ $? -eq 0 ]; then
  echo "Docker image built successfully."
else
  echo "Failed to build Docker image."
  exit 1
fi
