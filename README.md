# Closet Organizer

A modern web application for organizing your wardrobe, built with Spring Boot and React.

## Project Structure

```
closetOrganizer/
├── java/               # Spring Boot backend
│   ├── src/           # Source code
│   └── pom.xml        # Maven dependencies
├── frontend/          # React frontend
│   ├── src/          # Source code
│   └── package.json  # NPM dependencies
└── docker-compose.yml # Docker configuration
```

## Features

- User Authentication (Sign up/Login)
- Clothing Item Management
- Category Organization
- Search and Filter
- Image Upload Support

## Running the Application

### Using Docker Compose

1. Build and start all services:
   ```bash
   docker-compose up --build
   ```

2. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8081
   - H2 Database Console: http://localhost:8081/h2-console

### Development Mode

#### Backend (Spring Boot)
```bash
cd java
./mvnw spring-boot:run
```

#### Frontend (React)
```bash
cd frontend
npm install
npm start
```

## API Documentation

The REST API includes the following main endpoints:

- `/api/auth/*` - Authentication endpoints
- `/api/clothes/*` - Clothing management endpoints
- `/api/users/*` - User management endpoints

## Technologies

- Backend: Spring Boot, Spring Security, JWT, JPA/Hibernate
- Frontend: React, Material-UI
- Database: H2 (development), PostgreSQL (production)
- Build Tools: Maven, NPM
- Containerization: Docker
