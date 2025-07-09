# chat-app
# Real-Time Chat Application with Socket.io

A full-featured real-time chat application built with Node.js, React, Socket.io, MongoDB, and Tailwind CSS.

## Features:
    - Real-time messaging with Socket.io
    - User authentication (username/password)
    - Global chat rooms for group conversations
    - Private messaging between users
    - Typing indicators to show when others are composing messages
    - Online/offline status for all users
    - Message timestamps and read receipts
    - Multiple chat rooms with room creation
    - Real-time notifications for new messages

## Technologies Used
## Backend:
    - Node.js 12.22.12
    - Express.js
    - Socket.io 4.1.2
    - MongoDB 4.2
    - Mongoose ODM
## Frontend:
    - React
    - Vite 2
    - Tailwind CSS 2
    - Socket.io Client 4.1.3
    - React Router

## Prerequisites
    - Node.js 12.22.12 or later installed
    - MongoDB 4.2 installed and running
    - npm or yarn package manager
    
## Installation
1. Clone the repository:
   ```bash
      git clone
      cd
   ```
2. Install server dependencies:
    ```bash
       cd server
       npm install
    ```
3. Install client dependencies:
    ```bash
       cd client
       npm install
    ```
4. Set up environment variables:

   Create a .env file in both server and client directories with the following:

   Server .env:
   ```text
      MONGODB_URI=mongodb://localhost:27017/chat-app
      JWT_SECRET=your-secret-key
      PORT=5000
      CLIENT_URL=http://localhost:3000
   ```
   Client .env:
   ```text
      VITE_APP_API_URL=http://localhost:5000/api
      VITE_APP_SOCKET_URL=http://localhost:5000
   ```
   ## Running the Application

    1. Start the MongoDB server (if not already running)
    2. Start the backend server:
    ```bash
       cd server
       npm start
    ```
    3. Start the frontend development server:
     ```bash
        cd ../client
        npm run dev
     ```
    4. Access the application:
   
       Open your browser and navigate to http://localhost:3000
    # Project Structure
     ```text
     chat-app/
        ├── server/              # Backend code
        │   ├── config/          # Database configuration
        │   ├── controllers/     # Route controllers
        │   ├── models/          # MongoDB models
        │   ├── routes/          # Express routes
        │   ├── socket/          # Socket.io implementation
        │   ├── app.js           # Express app configuration
        │   └── server.js        # Server entry point
        ├── client/              # Frontend code
        │   ├── public/          # Static assets
        │   ├── src/
        │   │   ├── components/  # React components
        │   │   ├── context/     # React context providers
        │   │   ├── hooks/       # Custom React hooks
        │   │   ├── pages/       # Page components
        │   │   ├── services/    # API service functions
        │   │   ├── App.jsx      # Main App component
        │   │   └── main.jsx     # Client entry point
        ├── package.json         # Root package.json
        └── README.md            # This file
     ```
     ## Available Scripts
   
     In both server and client directories, you can run:
     - npm start: Starts the production server
     - npm run dev: Starts the development server with hot reloading
       
 ## Configuration

 You can customize the following aspects of the application:

    - Database: Change the MongoDB connection string in the server .env file

    Ports: Modify the ports in the environment variables

    JWT Secret: Change the secret key for authentication tokens

    UI: Customize the Tailwind CSS configuration in client/tailwind.config.js
    

   

    Responsive design that works on desktop and mobile
