# Product Management Application

This is a full-stack product management application built with Nest.js for the backend and Next.js for the frontend. The application allows users to manage products, including adding, deleting, and viewing product details and API documentation.

## Technologies Used

- **Backend:** Nest.js, TypeORM, PostgreSQL
- **Frontend:** Next.js, React
- **Styling:** Bootstrap 

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- Docker and Docker Compose
- PostgreSQL

### Step 1: Clone the Repository

git clone https://github.com/Jaydeep1250/Product-Management-App.git
cd product-management-app

Step 2: Set Up the PostgreSQL Database

Run the following command to start the database:
docker-compose up -d

Step 3: Configure Environment Variables
Create a .env file in the backend directory and add the following environment variables:

DATABASE_URL=postgresql://postgres:root@localhost:5432/products_db
JWT_SECRET=XYZjayA1234

Step 4: Install Dependencies

# Navigate to the backend and install dependencies
cd backend
npm install

# Navigate to the frontend and install dependencies
cd ../frontend
npm install

Running the Application
Step 1: Start the Backend
# Navigate to the backend directory and run the Nest.js application:

npm run start

Step 2: Start the Frontend
# Navigate to the frontend directory and run the Next.js application:

npm run dev


Step 3: Access the Application
Open your browser and go to http://localhost:3000 to view the product management interface."# Product-Management-App" 
