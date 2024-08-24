# Password Manager Backend

## Overview
This is the backend part of the Password Manager application, built with Node.js, Express.js, and MongoDB. It provides secure user authentication and manages the storage and retrieval of user passwords.

## Features
- **User Authentication:** Handles user registration and login using JSON Web Tokens (JWT) for secure sessions.
- **Password Management:** Provides API endpoints for creating, updating, and retrieving saved passwords.
- **Secure Data Storage:** Utilizes MongoDB to store user data and encrypted passwords.

## Technologies Used
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
- **Authentication:**
  - JSON Web Tokens (JWT) for secure authentication and authorization.
- **Data Encryption:**
  - Passwords are securely hashed and stored.

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/akshitasaxena1309/Password-Manager.git
    ```
2. Navigate to the backend directory:
    ```sh
    cd password-manager/backend
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Set up environment variables:
   Create a `.env` file in the `backend` directory with the following variables:
    ```env
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret_key>
    ```
5. Start the server:
    ```sh
    npm start
    ```

## API Endpoints

### User Authentication
- **POST /register**
  - Registers a new user.
  - **Request Body:** `{ "email": "user@example.com", "password": "yourpassword" }`

- **POST /login**
  - Logs in a user and returns a JWT.
  - **Request Body:** `{ "email": "user@example.com", "password": "yourpassword" }`

### Password Management
- **POST /addSite**
  - Adds a new password entry for the logged-in user.
  - **Request Body:** `{ "website": "example.com", "username": "user", "password": "yourpassword" }`
  - **Headers:** `Authorization: Bearer <jwt_token>`

- **DELETE /deleteSite/:siteId**
  - Deletes a password entry.
  - **Headers:** `Authorization: Bearer <jwt_token>`

- **POST /update/:siteId**
  - Updates a password entry.
  - **Request Body:** `{ "website": "example.com", "username": "user", "password": "newpassword" }`
  - **Headers:** `Authorization: Bearer <jwt_token>`

- **GET /passwordInfo**
  - Retrieves all password entries for the logged-in user.
  - **Headers:** `Authorization: Bearer <jwt_token>`

## Middleware
- **authMiddleware:** Secures routes by verifying JWT tokens to ensure that only authenticated users can access them.

## Contributing
Feel free to contribute to this project by opening issues or submitting pull requests.

## License
This project is licensed under the MIT License.

## Contact
For any questions or inquiries, please contact me at [your email address].

---

*This backend service provides secure and reliable management of user passwords for the Password Manager application.*
