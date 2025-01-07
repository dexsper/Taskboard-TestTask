# Taskboard

## Overview

This repository contains a backend solution for the test task of a "Backend Intern (Node.js/NestJS)" position. The task
involves creating a system for managing users, columns, cards, and comments, with the necessary backend infrastructure
and API endpoints built with NestJS. The system features authorization, role-based access control (RBAC), and CRUD
operations for managing the entities.

## Technologies Used

- **NestJS** – A progressive Node.js framework for building efficient and scalable server-side applications.
- **TypeORM** – ORM for TypeScript and JavaScript (ES7, ES8).
- **Passport + JWT** – Authentication and authorization strategy for securing the API with JSON Web Tokens.
- **PostgreSQL** – Relational database for storing the entities.
- **Swagger** – API documentation tool for the backend.

## Entities

### Database Diagram
![Taskboard](https://github.com/user-attachments/assets/c4e634a2-e98a-46d7-988f-43223a84f4a0)

### Relationships

- One **User** can have multiple **Columns**.
- One **Column** can have multiple **Cards**.
- One **Card** can have multiple **Comments**.

## Features

### 1. User Authorization

- **POST /auth/login** – Login with email and password, returns a JWT token.
- The JWT token is included in the Authorization header for subsequent requests to identify the user.

### 2. CRUD Operations

**Auth**

*   **POST `/api/auth/signup`** – Create a new user (sign up).
*   **POST `/api/auth/signin`** – Sign in user and return authentication token.
*   **POST `/api/auth/logout`** – Logout the current user.

**Users**

*   **GET `/api/users/{userId}`** – Get user details by ID.
*   **GET `/api/users/me`** - Get the current user.

**Columns**

*   **GET `/api/users/columns`** – Get columns for the logged-in user.
*   **POST `/api/users/columns`** – Create a column for the current user.
*   **GET `/api/users/columns/{columnId}`** - Get a column by id.
*   **PATCH `/api/users/columns/{columnId}`** - Update a column by id.
*   **DELETE `/api/users/columns/{columnId}`** – Delete a specific column by its ID.

**Cards**

*   **GET `/api/users/columns/{columnId}/cards`** – Get cards in a specific column.
*   **POST `/api/users/columns/{columnId}/cards`** – Create a card in a specific column.
*   **GET `/api/users/columns/{columnId}/cards/{cardId}`** - Get a card by id.
*   **PATCH `/api/users/columns/{columnId}/cards/{cardId}`** - Update a card by id.
*   **DELETE `/api/users/columns/{columnId}/cards/{cardId}`** – Delete a specific card.

**Comments**

*   **GET `/api/users/columns/{columnId}/cards/{cardId}/comments`** – Get comments for a specific card.
*  **POST `/api/users/columns/{columnId}/cards/{cardId}/comments`** – Create a comment for a card.
*   **GET `/api/users/columns/{columnId}/cards/{cardId}/comments/{commentId}`** - Get a comment by id.
*   **PATCH `/api/users/columns/{columnId}/cards/{cardId}/comments/{commentId}`** - Update a comment by id.
*   **DELETE `/api/users/columns/{columnId}/cards/{cardId}/comments/{commentId}`** – Delete a specific comment.

### 3. Role-Based Access Control (RBAC)

- Only authorized users (owners of the respective entities) are allowed to modify or delete columns, cards, or comments.
- The RBAC system checks ownership using a combination of guards and services:
    - **RolesGuard** -> **RbacService** -> **CoreRelationResolver** -> **EntityRelationResolver**
    - In my case: **ColumnRelationResolver** for user → column → card → comment.

### 4. Data Validation

- All incoming data is validated using **Validation Pipes**:
    - Email validation.
    - String, number, and character length validations.

### 5. API Documentation

- The project includes Swagger for automatic API documentation.
- Each endpoint is annotated with **ApiTags**, **ApiOperation**, and **ApiProperty** to provide detailed descriptions
  and model specifications.

## Setup Instructions

1. **Clone the repository**:

```bash
git clone https://github.com/dexsper/Taskboard-TestTask.git
```

2. **Install dependencies**:

```bash
yarn install
```

3. **Set up the database**:  Configure your database connection in the `.env` file.
4. **Run the application**:

```bash
yarn start:dev
```

5. **Access the Swagger Documentation**:
    - Open the Swagger UI at `http://localhost:3000/docs` to explore and test the API endpoints.

## Conclusion

This backend project showcases how to build a NestJS application with user authentication, role-based access control,
and CRUD operations for managing a system of users, columns, cards, and comments. It adheres to RESTful API conventions
and is fully documented with Swagger for easy integration and testing.

