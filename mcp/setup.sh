#!/bin/bash

# Tobe Blog Content MCP Server Setup Script

echo "🚀 Setting up Tobe Blog Content MCP Server..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"

# Build the project
echo "🔨 Building TypeScript..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Failed to build project"
    exit 1
fi

echo "✅ Project built successfully"

# Create environment configuration
if [ ! -f ".env" ]; then
    echo "⚙️  Creating environment configuration..."
    cat > .env << EOF
# Tobe Blog Content MCP Server Configuration

# Required: Base URL of the Tobe Blog backend service
TOBE_BLOG_BASE_URL=http://localhost:8080

# Required: JWT authentication token for API access
# Get this from the Tobe Blog admin panel or authentication endpoint
TOBE_BLOG_AUTH_TOKEN=your-jwt-token-here

# Optional: Request timeout in milliseconds (default: 30000)
TOBE_BLOG_TIMEOUT=30000
EOF
    echo "✅ Environment configuration created (.env)"
    echo "📝 Please edit .env to set your actual configuration values"
else
    echo "ℹ️  Environment configuration already exists (.env)"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env file with your actual configuration"
echo "2. Get a JWT token from your Tobe Blog backend"
echo "3. Run the server:"
echo "   • Development: npm run dev"
echo "   • Production: npm start"
echo ""
echo "📖 See README.md for detailed documentation" 