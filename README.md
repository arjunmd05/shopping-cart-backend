# Shopping App API

A complete, scalable backend for a modern e-commerce application, featuring user authentication, product management, a full shopping cart, and a final checkout flow. This API is built with a focus on security, performance, and best practices.

**Live URL:** [https://shopping-cart-backend-qqwd.onrender.com](https://shopping-cart-backend-qqwd.onrender.com)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

---

## Architecture Overview

This project follows the **Model-View-Controller (MVC)** design pattern to ensure a clean separation of concerns. The data flows from the client, through the routing and middleware layers, to the controllers which orchestrate business logic with the models, and finally interacts with the MongoDB database.

---

## Features

- ✅ **Secure User Authentication:** Full user registration and login functionality using JSON Web Tokens (JWT) for secure, stateless authentication.
- ✅ **Profile & Address Management:** Complete CRUD (Create, Read, Update, Delete) API for users to manage their profiles and shipping addresses.
- ✅ **Product Catalog:** API for browsing and creating products.
- ✅ **Wishlist Functionality:** Allows users to save their favorite products for later (Add/Remove/View).
- ✅ **Shopping Cart Management:** Robust cart API to add, update, and remove items.
- ✅ **Complete Checkout Flow:** A secure endpoint to convert a user's cart into a permanent order.
- ✅ **Error Handling:** Centralized error handling middleware for consistent and predictable error responses.

---

## Getting Started: Local Setup

To run this project on your local machine, please follow the steps below.

### Prerequisites

- Node.js (v18 or higher)
- npm
- Git
- Postman (for API testing)

### Installation

1.  Clone the repository:
    ```sh
    git clone [https://github.com/arjunmd05/shopping-cart-backend.git](https://github.com/arjunmd05/shopping-cart-backend.git)
    ```
2.  Navigate to the project directory:
    ```sh
    cd shopping-cart-backend
    ```
3.  Install the required dependencies:
    ```sh
    npm install
    ```

### Configuration

1.  Create a `.env` file in the root directory of the project.
2.  Add the following environment variables. You will need to provide your own values.

    ```
    MONGO_URI=your_mongodb_atlas_connection_string
    JWT_SECRET=your_long_random_jwt_secret_key
    PORT=5001
    ```

### Running the Application

To start the server in development mode (with auto-restart on file changes), run:
```sh
npm run dev
```

The server will be available at `http://localhost:5001`.

---

### Postman Collection

To make testing easy, a Postman collection is available. You can download the file and import it into your Postman application to get all the API requests ready to go.

[**Download the Postman Collection File Here**](https://github.com/arjunmd05/shopping-cart-backend/blob/main/Shopping_Cart_API.postman_collection.json)

After importing, please set the `baseURL` variable in the collection to `https://shopping-cart-backend-qqwd.onrender.com` for live testing or `http://localhost:5001` for local testing. You will also need to run the "Login User" request to get a token and set it in the collection's "Authorization" tab.
