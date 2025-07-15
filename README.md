# 🗓️ Event Management REST API using Node.js, Express, and PostgreSQL

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/hbhandari0005/event-management-api
cd event-management-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

In the root of your project, create a file named `.env` and add the following:

```
PORT=5000
DATABASE_URL=postgres://yourusername:yourpassword@your-host:5432/yourdbname?ssl=true
```

> ⚠️ Replace with your actual PostgreSQL connection string (e.g., from Render).

### 4. Start the application

```bash
npm run dev
```

The server will start on `http://localhost:5000`

---

## 📘 API Overview

### User Routes

| Method | Route        | Description              |
|--------|--------------|--------------------------|
| GET    | /users/new   | Show user creation form  |
| POST   | /users       | Create new user          |

### Event Routes

| Method | Route                    | Description                        |
|--------|--------------------------|------------------------------------|
| GET    | /events/new              | Show form to create new event      |
| POST   | /events                  | Create new event                   |
| GET    | /events/:id/register     | Show form to register user         |
| POST   | /events/:id/register     | Register user for the event        |
| GET    | /events/:id/cancel       | Show form to cancel registration   |
| POST   | /events/:id/cancel       | Cancel a user's registration       |
| GET    | /events/:id/stats        | View registration stats            |

---

## ✅ Business Logic Enforced

- Prevent double registration
- Limit registrations to event capacity
- Disallow registration for past events
- Input validation for all routes
- Clear error messages and status codes

---

## 📁 Folder Structure

```
controllers/       # Business logic for events and users
routes/            # Route definitions
models/            # PostgreSQL DB connection setup
middlewares/       # Error handling middleware
views/             # EJS frontend templates
public/            # CSS and static files
```

---

## 📎 Example Requests

### Register a user

```http
POST /events/3/register
Body: { "userId": 2 }
```

### Cancel registration

```http
POST /events/3/cancel
Body: { "userId": 2 }
```

---

## 👤 Author

[Harshit Bhandari](https://github.com/hbhandari0005)
