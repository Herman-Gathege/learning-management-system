# 📚 LMS Prototype – Full Stack Application

## 🚀 Project Overview

This project is a **Learning Management System (LMS) prototype** built to demonstrate full-stack development skills, including frontend, backend, databases, authentication, and system design.

The platform supports two user roles:

- **Admin** – manages courses and content  
- **Learner** – consumes courses and tracks progress  

The system is designed with scalability in mind and follows a modular structure that can be extended into microservices.

---

## 🛠️ Tech Stack

### Frontend
- React (ES6+)
- React Router
- Fetch API
- CSS (custom styling)

### Backend
- Python (Flask)
- Flask JWT Extended (authentication)
- Flask SQLAlchemy (ORM)
- Flask Bcrypt (password hashing)

### Databases
- PostgreSQL → Users, roles, course metadata  
- MongoDB → Course content, lessons, user progress  

### DevOps
- Docker & Docker Compose  
- Git & GitHub  

---

## 🔐 Authentication & Authorization

- JWT-based authentication  
- Passwords hashed using bcrypt  

### Role-based access control:
- Admin routes protected  
- Learner routes protected  

### Auth Flow

Register → Login → Receive JWT → Store Token → Access Protected Routes


---

## ✨ Features

### 👨‍💼 Admin
- Login as admin  
- Create courses (title, description, category)  
- Add lessons (text/video content)  
- View all created courses  
- View user activity logs  

### 🎓 Learner
- Register & login  
- Browse course catalog  
- View course details & lessons  
- Mark lessons as completed  
- Track course progress (e.g. 3/5 lessons)  

---

## 📡 API Endpoints (Sample)

### Auth

POST /auth/register
POST /auth/login


### Courses

GET /courses
POST /courses (admin only)
GET /courses/:id


### Lessons

POST /courses/:id/lessons (admin only)
GET /courses/:id/lessons


### Progress

POST /progress/complete
GET /progress/:course_id


---

## 🗄️ Database Design

### PostgreSQL (Relational)

Used for structured data:
- Users (id, email, password, role)  
- Courses (title, description, category)  

**Why SQL?**
- Strong relationships  
- Data integrity  
- Structured queries  

---

### MongoDB (NoSQL)

Used for flexible data:
- Lessons (content, type, media)  
- User progress (completed lessons, scores)  

**Why NoSQL?**
- Flexible schema for course content  
- Easier handling of nested structures  

---

## 🧱 Project Structure


lms-project/
│
├── frontend/
│ ├── src/
│ ├── /src/components/
│ ├── /src/pages/
│ └── /src/api/
│
├── backend/
│ ├── /app/auth/
│ ├── /app/users/
│ ├── /app/courses/
│ ├── /app/progress/
│ └── /app/logs/
│
├── docker-compose.yml
└── README.md


---

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone https://github.com/Herman-Gathege/learning-management-system
cd lms-project

2. Backend Setup
cd backend

use uv init to start the virtual environment
use uv run pip install -r requirements.txt {to install dependencies}
create .env file

3. Frontend Setup
cd frontend

npm install

Create .env:

4. Docker Setup (Recommended)

from root directory run: 
  docker compose exec backend uv run flask db upgrade
  docker compose down  
  docker compose build backend
  docker compose build frontend
  docker compose up -d

postgres in use issue?:
  sudo lsof -i :5432
  sudo systemctl stop postgresql

making changes: 
  

  docker compose build --no-cache frontend or backend
  docker compose up


This starts:

frontend

backend

PostgreSQL

MongoDB

🧪 Testing the App

from root directory run: docker compose ps {to check if containers are running}
docker compose logs -f backend {to monitor backend logs}
docker compose logs -f frontend {to monitor frontend logs}
docker compose logs -f {to monitor all logs}
docker compose exec backend uv run flask db migrate -m "describe your change" {to create a migration}
docker compose exec backend uv run flask db upgrade {to apply the migration}

after adding new features
docker compose exec backend uv run flask db migrate -m "describe your change" {to create a migration}
docker compose exec backend uv run flask db upgrade {to apply the migration}
docker compose build backend

when done with the docker and want to close :
press w then  press d


Register a user

Login

Verify token is stored

Access dashboard

Test role-based access

🔍 Design Decisions

JWT Authentication for stateless security

Role-based access control for separation of concerns

SQL + NoSQL hybrid to demonstrate database understanding

Modular backend structure to support microservices transition


🧩 Microservices Consideration

The system can be split into:

Auth Service (login/register)

Course Service (courses & lessons)

Progress Service (tracking)

Logging Service (audit trail)

Each module is already structured to allow easy separation.



📊 Non-Functional Requirements

✅ Secure password hashing (bcrypt)

✅ JWT-protected routes

✅ Input validation

✅ Error handling

✅ Audit logging

✅ Clean and modular code

🎨 UI/UX Design

Wireframes and design sketches are included in the /design folder.

Focus:

Simplicity

Clear navigation

Role-based dashboards



📌 Future Improvements

Refresh tokens & session management

Video streaming optimization

Quiz system

Notifications

Deployment (AWS / Render)

👤 Author

Herman Gathege

GitHub: https://github.com/Herman-Gathege



📅 Submission

Deadline: 23rd March 2026

Repository: Public GitHub link https://github.com/Herman-Gathege/learning-management-system