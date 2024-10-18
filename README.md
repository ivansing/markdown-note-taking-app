# 📝 Markdown Note-Taking App

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![Swagger Docs](https://img.shields.io/badge/API_Docs-Swagger-blue)

A full-stack application for managing Markdown notes with grammar checking capabilities. Built with **Express.js** for the backend and **Next.js** for the frontend, it offers CRUD operations, file uploads, and integrates with LanguageTool for grammar corrections. The application includes interactive Swagger UI for comprehensive API documentation.

**Live Demo**:
**Live Demo:** [https://markdown-note-taking-app-v5vc-3yiqnvp3x-ivans-projects-9dbcc5b6.vercel.app/](https://markdown-note-taking-app-v5vc-3yiqnvp3x-ivans-projects-9dbcc5b6.vercel.app/)


## 📚 Table of Contents

- [📦 Features](#-features)
- [🚀 Installation](#-installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [🔧 Usage](#-usage)
  - [Development](#development)
  - [Production](#production)
- [🧪 Testing](#-testing)
- [🛠 API Documentation](#-api-documentation)
- [🌐 Environment Variables](#-environment-variables)
- [📜 Scripts](#-scripts)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [🔮 Future Enhancements](#-future-enhancements)

## 📦 Features

- **CRUD Operations:** Create, Read, Update, and Delete Markdown notes.
- **File Upload:** Upload Markdown files to create notes.
- **Grammar Check:** Integrates with LanguageTool API for grammar corrections.
- **Interactive API Documentation:** Swagger UI provides detailed API endpoint information.
- **Frontend Interface:** Built with Next.js for a seamless user experience.
- **Environment Management:** Separate configurations for development and production.

## 🚀 Installation

### Backend Setup

1. **Clone the Repository**

    ```bash
    git clone https://github.com/ivansing/markdown-note-taking-app.git
    cd markdown-note-taking-app/backend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**

    - Create `.env.development` and `.env.production` files in the `backend` directory.
    - Add the necessary variables as shown below.

    **Example `.env.development`**

    ```env
    NODE_ENV=development
    PORT=3000
    NOTES_FILE_PATH=notes.json
    ```

    **Example `.env.production`**

    ```env
    NODE_ENV=production
    PORT=8000
    NOTES_FILE_PATH=notes.json
    ```

4. **Ensure `notes.json` Exists**

    - The application uses a `notes.json` file for data storage. If it doesn't exist, it will be created automatically upon running the server.

### Frontend Setup

1. **Navigate to Frontend Directory**

    ```bash
    cd ../frontend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**

    - Create a `.env.local` file in the `frontend` directory.
    - Add the necessary variables as shown below.

    **Example `.env.local`**

    ```env
    NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
    ```

    **Note:** Replace `http://localhost:3000` with your backend server URL if different.

## 🔧 Usage

### Development

Start both backend and frontend servers in development mode with hot-reloading.

1. **Start Backend Server**

    ```bash
    cd backend
    npm run start:dev
    ```

    **Expected Output**

    ```bash
    Server running on http://localhost:3000
    Notes loaded from file.
    Swagger UI available at http://localhost:3000/api-docs
    ```

2. **Start Frontend Server**

    Open a new terminal window/tab:

    ```bash
    cd frontend
    npm run dev
    ```

    **Expected Output**

    ```bash
    ready - started server on http://localhost:3001
    ```

    **Access the Application**

    - **Frontend:** [http://localhost:3001](http://localhost:3001)
    - **Swagger Docs:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Production

Build and start both backend and frontend servers in production mode.

1. **Build Frontend**

    ```bash
    cd frontend
    npm run build
    npm start
    ```

2. **Start Backend Server**

    Open a new terminal window/tab:

    ```bash
    cd backend
    npm run start:prod
    ```

    **Access the Application**

    - **Frontend:** [http://localhost:3001](http://localhost:3001)
    - **Swagger Docs:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## 🧪 Testing

A comprehensive test suite has been set up using **Mocha**, **Chai**, and **Supertest** to ensure the reliability and functionality of the API endpoints.

### Test Summary

```bash
📚 Notes API Endpoints
Notes loaded from file.
    ✔ should create a new note
    ✔ should retrieve a single note
    ✔ should retrieve all notes
    ✔ should update the created note
    ✔ should delete the created note
    ✔ should upload a markdown file and create a new note
    ✔ should check grammar of a given text

🔍 Test Summary
✅ Passed: 7 / 7
❌ Failed: 0 / 7
🎉 All tests passed successfully!

7 passing (103ms)
```

## Running the Tests
Ensure your server is running before executing the tests.
 1. **Start theh Server**
    
    In a separate terminal:
    ```bash
    cd backend
    npm run start:dev
    ```

    **Expected Output**
    ```bash
    Server started on http://localhost:3000
    Notes loaded from file.
    ```
 2. **Exucute the Test Suite**
    ```bash
    npm test
    ```  
    **Or, using npx:**
    ```bash
     npx mocha tests/testNote.test.js
    ```
## Understanding the Test Results
- ✔ Passed Tests: Indicates successful execution of the test case.
- ❌ Failed Tests: Indicates that the test case did not pass as expected.
- 🎉 All tests passed successfully!: Confirmation that all tests have been executed without any failures.

## Test Cases Covered
 1. Create a New Note
 2. Retrieve a Single Note
 3. Retrieve All Notes
 4. Update a Note
 5. Delete a Note
 6. Upload a Markdown File and Create a New Note
 7. Check Grammar of a Given Text

## 🛠 API Documentation

Access the interactive API documentation via Swagger UI:

[Interactive docs](http://localhost:3000/api-docs)

This documentation provides detailed information about all available endpoints, request/response schemas, and example usages.


## 🌐 Environment Variables
Manage different configurations for development and production using .env files.

**.env.development**
    ```env
    NODE_ENV=development
    PORT=3000
    NOTES_FILE_PATH=notes.json
    ```
.env.production
    ```env
    NODE_ENV=production
    PORT=8000
    NOTES_FILE_PATH=notes.json
    ```

## 📜 Scripts
- Start Development Server:

    ```bash
    npm run start:dev
    ```
- Start Production Server:

    ```bash
    npm run start:prod
    ```

- Default Start:

    ```bash
    npm start
    ```
    - Run Tests:
    ```bash
    npm test
    ```

## Frontend

.env.local

    ```env
    NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
    ```
## Scripts

### Backend

    - Start Development Server:

        ```bash
        npm run start:dev
        ```
    - Start Production Server:
        ```bash
        npm run start:prod
        ```
    - Default Start:
        ```bash
        npm start
        ```
    - Run Tests:
        ```bash
        npm test
        ```

### Frontend

    - Start Development Server:
        ```bash
        npm run dev
        ```
    - Build for Production:
        ```bash
        npm run build
        ```
    - Start Production Server:
        ```bash
        npm start
        ```        

🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

1. Fork the Repository

2. Create a Feature Branch:

```bash
git checkout -b feature/YourFeature
```
3. Commit Your Changes:
```bash
git commit -m "Add some feature"
```
4. Push to the Branch:
```bash
git push origin feature/YourFeature
```
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🔮 Future Enhancements

- **Next.js Frontend:** Enhance the user-friendly frontend interface.
- **Authentication: Implement user authentication and authorization.
- **Database Integration:** Move from file-based storage to a robust database like MongoDB or PostgreSQL.
- **Testing:** Add comprehensive unit and integration tests for both frontend and backend.
- **Deployment:** Deploy the application to platforms like Heroku, Vercel, or AWS.
- **Real-time Collaboration:** Allow multiple users to collaborate on notes in real-time.
- **Tagging and Categorization:** Enable tagging and categorizing notes for better organization.
- **Search Functionality:** Implement advanced search capabilities to find notes quickly.
- **Dark Mode:** Add a dark mode option for better accessibility and user preference.

## 📷 Screenshots


## 💡 Additional Information
[GitHub Repository:](https://github.com/ivansing/markdown-note-taking-app)
Swagger Documentation: http://localhost:3000/api-docs

## 🎉 Thank You!

Thank you for checking out the Markdown Note-Taking App! If you have any questions or suggestions, feel free to open an issue or submit a pull request.
