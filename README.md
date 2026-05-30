# Restaurant App Frontend

Frontend desarrollado con React y Vite para consumir una API REST construida en ASP.NET Core.

## Features

* JWT Authentication
* Role-Based Authorization (Admin / User)
* Protected Routes with React Router
* Product CRUD Operations
* Soft Delete Support
* Pagination
* Centralized API Client
* Authentication Context (AuthContext)
* Loading States
* Toast Notifications
* Confirmation Modal
* Responsive Dashboard UI

## Tech Stack

* React
* Vite
* React Router
* Context API
* JavaScript (ES6+)
* CSS
* JWT Authentication
* REST API

## Project Structure

```text
src/
├── api/
├── components/
├── context/
├── pages/
└── assets/
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

## Backend

This project consumes an ASP.NET Core REST API that provides:

* JWT Authentication
* Role Management
* Product Management
* Pagination
* Soft Delete
* Global Exception Handling
* FluentValidation
