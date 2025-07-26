#!/bin/bash

# Simple Cloud Deployment Script
# Works with any VM (Digital Ocean, AWS EC2, GCP Compute Engine)

echo "🚀 Todo Frontend Deployment Starting..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker if not exists
if ! command -v docker &> /dev/null; then
    echo "📦 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
fi

# Install Docker Compose if not exists
if ! command -v docker-compose &> /dev/null; then
    echo "📦 Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Clone or update project
PROJECT_DIR="/home/$(whoami)/todo-frontend"
if [ -d "$PROJECT_DIR" ]; then
    echo "🔄 Updating project..."
    cd $PROJECT_DIR
    git pull origin main
else
    echo "📥 Cloning project..."
    git clone https://github.com/your-username/todo-frontend.git $PROJECT_DIR
    cd $PROJECT_DIR
fi

# Set environment variables
echo "🔧 Setting environment variables..."
export NEXT_PUBLIC_API_URL=${BACKEND_URL:-http://localhost:8083}

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down || true

# Build and start
echo "🏗️  Building and starting containers..."
docker-compose up -d --build

# Show status
echo "✅ Deployment complete!"
echo "🌐 Frontend is running at: http://$(curl -s ifconfig.me):3000"
docker-compose ps

echo "📋 Useful commands:"
echo "  - View logs: docker-compose logs -f"
echo "  - Stop: docker-compose down"
echo "  - Restart: docker-compose restart" 