# 📝 Mardown Note-Taking App

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)
![Swagger Docs](https://img.shields.io/badge/API_Docs-Swagger-blue)

A backend application for managing Markdown notes with grammar checking capabilities. Built with **Express.js**, it offers CRUD operations and integrates with LanguageTool for grammar corrections. Future plans include a **Next.js** frontend for an enhanced user experience.

## 📚 Table of Contents

- [📦 Features](#-features)
- [🚀 Installation](#-installation)
- [🔧 Usage](#-usage)
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
- **Environment Management:** Separate configurations for development and production.
- **API Documentation:** Interactive Swagger UI for all API endpoints.

## 🚀 Installation

### 1. **Clone the Repository**

```bash
git clone https://github.com/ivansing/markdown-note-taking-app.git
cd markdown-note-taking-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
 - Create `.env.development` and `.env.production` files in the root directory
 - Add the necessary variables as shown below.

 **Example** `.env.development`
 ```env
 NODE_ENV=development
 ```
 **Example** `.env.development`
 ```env
 NODE_ENV=development
 ```

 ## 🔧 Usage
 ## Development
 Start the server in development mode with hot-reloading:
 ```bash
 npm run start:dev
 ```

 ## Production

 Start the server in production mode:
 ```bash
 npm run start:pro
 ```
## Default Start

Start the server using default enviroment (`node app.js`):
```bash
npm start
```

## 🧪 Testing

A comprehensive test suite has been set up using Mocha, Chai, and Supertest to ensure the reliability and functionality of the API endpoints.

**Test Summary**
```bash
📚 Notes API Endpoints
Notes loaded from file.
    ✔ ✔ should create a new note
    ✔ ✔ should retrieve a single note
    ✔ ✔ should retrieve all notes
    ✔ ✔ should update the created note
    ✔ ✔ should delete the created note
    ✔ ✔ should upload a markdown file and create a new note
    ✔ ✔ should check grammar of a given text

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
    node app.js
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
NOTES_FILE_PATH=notes.development.json
```
.env.production
```env
NODE_ENV=production
PORT=8000
NOTES_FILE_PATH=notes.production.json
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

🤝 Contributing

Contributions are welcome! Please follow these steps:

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

- Next.js Frontend: Develop a user-friendly frontend interface.
- Authentication: Implement user authentication and authorization.
- Database Integration: Move from file-based storage to a robust database like MongoDB or PostgreSQL.
- Testing: Add comprehensive unit and integration tests.
Deployment: Deploy the application to platforms like Heroku, Vercel, or AWS.

## 📷 Screenshots


## 💡 Additional Information
[GitHub Repository:](https://github.com/ivansing/markdown-note-taking-app)
Swagger Documentation: http://localhost:3000/api-docs

## 🎉 Thank You!

Thank you for checking out the Markdown Note-Taking App! If you have any questions or suggestions, feel free to open an issue or submit a pull request.
