#!/bin/bash

if [ -f .env ]; then
  source .env
else
  echo "Error: .env file not found"
  exit 1
fi

echo "Starting deployment..."

echo "Building the Angular application for production..."
npm run build
if [ $? -ne 0 ]; then
  echo "Build failed. Aborting deployment."
  exit 1
fi
echo "Build successful."

echo "Uploading files to $SERVER_IP..."

rsync -avz --delete -e "ssh -p $SERVER_PORT -i $SSH_IDENTITY" "$LOCAL_BUILD_DIR" "$SERVER_USER@$SERVER_IP:$REMOTE_DIR"

if [ $? -ne 0 ]; then
  echo "Deployment failed during file transfer."
  exit 1
fi

echo "Deployment complete."
