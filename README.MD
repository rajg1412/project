Retail Sales Management System - Frontend
Modern React-based frontend for retail sales data management.
🛠️ Tech Stack

Framework: React 18
Build Tool: Vite
HTTP Client: Axios
Icons: Lucide React
Styling: Custom CSS with CSS Variables
Date Handling: Date-fns

# Install dependencies
npm install

# Start development server
npm run dev


Create .env or .env.local in the frontend directory:
envVITE_API_URL=http://localhost:5000


Retail Sales Management System - Backend
RESTful API backend for managing retail sales data with MongoDB.
🛠️ Tech Stack

Runtime: Node.js 18+
Framework: Express.js
Database: MongoDB with Mongoose ODM
Data Processing: CSV Parser
Utilities: Lodash, Date-fns


# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB connection string

Create a .env file in the backend directory:
envPORT=5000
NODE_ENV=development

npm run dev
# Server runs on http://localhost:5000
# Auto-restarts on file changes
