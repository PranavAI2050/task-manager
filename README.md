hosted website https://task-manager-frontend-qpco.onrender.com/

https://github.com/user-attachments/assets/26e43b47-1267-416c-97bd-87280e5a2e07
# Backend Project Setup Guide

**Note:** Even after following the setup steps, there may be some issues during installation or usage. One common issue that I faced was related to force updates. This can be resolved by using the output of the code and checking for the error messages in the console. A typical solution to such issues could involve ensuring that your dependencies are correctly updated or troubleshooting by clearing the cache or reinstalling specific modules.

---

## Required Libraries:
- `jsonwebtoken` (JWT)
- `mongoose`
- `express`
- `bcryptjs`
- `cors`
- `dotenv`

## Installation Steps:

1. **Navigate to the Backend Folder**:
   Ensure you are inside the `Task Manager` project folder, and then navigate to the `backend` directory:
   ```bash
   cd backend
2. **Install required modules**:
   ```bash
   npm install jsonwebtoken mongoose express bcryptjs cors dotenv
3. **Update the .env file**:
   ```bash
   PORT=3006
   MONGO_URI=<your_mongo_database_uri>
   JWT_SECRET=<your_jwt_secret>
4. **Start the server**:
    ```bash
    node server.js

# Frontend Project Setup Guide

---

## Required Libraries:
- `axios`
- `react-router-dom`
- `react`
- `react-dom`

## Installation Steps:
1. **Create the React App**
   Ensure you are inside the `Task Manager` project folder, and then create the react app `frontend` and move the folder pages and services in src folder of `frontend`  and replace contents of App.js with provided App.js file:
   ```bash
   npx create-react-app frontend
   
2. **Navigate to the Frontend Folder**:
   Ensure you are inside the `Task Manager` project folder, and then navigate to the `frontend` directory:
   ```bash
   cd frontend
3. **Install required modules**:
   ```bash
   node install axios react-router-dom react react-dom
4. **Start the React Application**:
    ```bash
    npm start

This `README.md` now includes steps for both backend and frontend setup, as well as guidance for troubleshooting and running the server at the correct port (`http://localhost:3006` for the frontend).


