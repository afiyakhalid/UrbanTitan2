# UrbanTitan Backend

A Spring Boot REST API backend for the UrbanTitan e-commerce platform with JWT authentication, Google OAuth integration, and comprehensive product catalog management.

## 🚀 Quick Start

### Prerequisites
- Java 25+ (or use Docker)
- PostgreSQL 15+ (or use Docker Compose)
- Docker Desktop (recommended)

### Option 1: Docker Compose (Recommended)

```powershell
# Windows PowerShell - Quick Setup
.\setup-local-docker.ps1

# Or manually
docker-compose -f src\main\resources\docker-compose.yml up --build
```

Access:
- **API**: http://localhost:8080
- **Health**: http://localhost:8080/actuator/health
- **pgAdmin**: http://localhost:5050 (admin@urbantitan.com / admin)

### Option 2: Local Development

```powershell
# 1. Setup environment file
Copy-Item .env.example .env
# Edit .env with your credentials (JWT_SECRET and GOOGLE_OAUTH_CLIENT_ID are pre-configured)

# 2. Run with helper script (recommended - automatically loads .env)
.\run-backend.ps1

# Or run with Gradle directly (also loads .env automatically)
.\gradlew bootRun

# Or build and run JAR
.\gradlew bootJar
java -jar build\libs\*.jar
```

**Note**: The Gradle `bootRun` task now automatically loads environment variables from `.env` file.

## 📁 Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/urbantitan/code/
│   │   │   ├── CodeApplication.java
│   │   │   ├── configs/              # Security, JWT, CORS configuration
│   │   │   ├── controllers/          # REST API endpoints
│   │   │   ├── dto/                   # Data Transfer Objects
│   │   │   ├── entities/              # JPA entities
│   │   │   ├── enums/                 # Enums
│   │   │   ├── exceptions/            # Custom exceptions
│   │   │   ├── repositories/          # Data access layer
│   │   │   ├── security/              # Security components
│   │   │   └── services/              # Business logic
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-local.yaml
│   │       ├── application-remote.yaml
│   │       └── docker-compose.yml
│   └── test/
├── build.gradle
├── Dockerfile
├── .env.example
├── LOCAL_DOCKER_SETUP.md
├── CLOUD_RUN_DEPLOYMENT.md
└── README.md
```

## 🔧 Configuration

### Environment Variables

Required environment variables (set in `.env` file):

```env
# Database
DB_URL=jdbc:postgresql://localhost:5432/urbantitan
DB_USERNAME=postgres
DB_PASSWORD=postgres

# Security
JWT_SECRET=your-secret-key-here-minimum-32-characters
GOOGLE_OAUTH_CLIENT_ID=your-google-oauth-client-id

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000

# Profile (local, remote)
SPRING_PROFILE=local
```

### Profiles

- **local**: Development profile with verbose logging, SQL output
- **remote**: Production profile for Cloud Run deployment

## 🛠️ Development

### Build Project

```powershell
# Build without tests
.\gradlew build -x test

# Build bootJar
.\gradlew bootJar

# Clean build
.\gradlew clean build
```

### Run Tests

```powershell
.\gradlew test
```

### Format Code

```powershell
.\gradlew check
```

## 🐳 Docker

### Build Docker Image

```powershell
# Build image
docker build -t urbantitan-backend .

# Run container
docker run -p 8080:8080 --env-file .env urbantitan-backend
```

### Docker Compose Services

```powershell
# Start all services
docker-compose -f src\main\resources\docker-compose.yml up

# Start database only
docker-compose -f src\main\resources\docker-compose.yml up postgres pgadmin

# Stop services
docker-compose -f src\main\resources\docker-compose.yml down

# Remove volumes (reset database)
docker-compose -f src\main\resources\docker-compose.yml down -v
```

## 🌐 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/products/` | List all products |
| GET | `/api/v1/products/{id}` | Get product by ID |
| GET | `/api/v1/categories/` | List all categories |
| GET | `/api/v1/brands/` | List all brands |
| POST | `/api/auth/login` | Login with email/password |
| POST | `/api/auth/google` | Login with Google OAuth |
| POST | `/api/auth/register` | Register new user |

### Protected Endpoints (Require JWT)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/user/profile` | Get current user profile |
| PUT | `/api/v1/user/profile` | Update user profile |
| POST | `/api/v1/seller/onboard` | Seller onboarding |

### Health & Monitoring

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/actuator/health` | Health check |
| GET | `/actuator/info` | Application info |

## 🧪 Testing

### Test API Locally

```powershell
# Using PowerShell script
.\test-api.ps1

# Or manually with curl
curl http://localhost:8080/actuator/health
curl http://localhost:8080/api/v1/products/
```

### Test Cloud Run Deployment

```powershell
.\test-api.ps1 -BaseUrl "https://your-service.a.run.app"
```

## 🚢 Deployment

### Local Development
See [LOCAL_DOCKER_SETUP.md](LOCAL_DOCKER_SETUP.md) for detailed local setup instructions.

### Google Cloud Run
See [CLOUD_RUN_DEPLOYMENT.md](CLOUD_RUN_DEPLOYMENT.md) for complete Cloud Run deployment guide.

### Quick Deploy to Cloud Run

```bash
# Deploy from source (Cloud Build)
gcloud run deploy urbantitan-backend \
  --source . \
  --region=asia-south1 \
  --allow-unauthenticated \
  --set-env-vars="SPRING_PROFILE=remote,DB_URL=$DB_URL,DB_USERNAME=$DB_USER,DB_PASSWORD=$DB_PASS,JWT_SECRET=$JWT_SECRET,GOOGLE_OAUTH_CLIENT_ID=$CLIENT_ID"
```

## 🔒 Security

### Features
- ✅ JWT-based authentication
- ✅ Google OAuth 2.0 integration
- ✅ CORS protection with configurable origins
- ✅ Password encryption with BCrypt
- ✅ Role-based access control
- ✅ Stateless session management
- ✅ Secure headers configuration

### Security Best Practices Applied
1. Secrets stored in environment variables
2. Database credentials not in code
3. JWT secret minimum 32 characters
4. CORS restricted to specific origins
5. No credentials in version control

## 📊 Database

### Schema Management
- JPA/Hibernate for ORM
- `ddl-auto: update` for development
- Ready for Flyway migrations (dependency included)

### Supported Databases
- PostgreSQL 15+ (primary)
- Cloud SQL PostgreSQL
- Supabase PostgreSQL
- Neon (serverless PostgreSQL)

### Connection Pooling
- HikariCP (Spring Boot default)
- Max pool size: 10
- Min idle: 2
- Connection timeout: 20s

## 🛡️ Error Handling

- Global exception handler
- RESTful error responses
- Structured error messages
- HTTP status code compliance

## 📝 Logging

### Local Profile
- Log level: DEBUG
- SQL logging: enabled
- Format SQL: enabled

### Remote Profile
- Log level: INFO
- SQL logging: disabled
- Structured JSON logging

## 🔧 Troubleshooting

### Common Issues

**Port 8080 already in use**
```powershell
# Find and kill process
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**Database connection failed**
- Verify PostgreSQL is running: `docker ps`
- Check connection string in `.env`
- Ensure database exists: `urbantitan`

**Docker build fails**
```powershell
# Clean Docker cache
docker system prune -a
docker build --no-cache -t urbantitan-backend .
```

**JWT secret too short**
- Minimum 32 characters required
- Generate secure key: `openssl rand -base64 32`

## 📦 Dependencies

### Core
- Spring Boot 3.5.6
- Java 25
- PostgreSQL 42.7.3

### Security
- Spring Security
- JWT (jjwt-api 0.12.5)
- Google OAuth Client 2.4.0

### Database
- Spring Data JPA
- Hibernate
- Flyway (ready to use)

### Utilities
- Lombok
- ModelMapper
- Jackson

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test locally
4. Submit pull request

## 📄 License

Proprietary - UrbanTitan

## 🆘 Support

- Documentation: See `LOCAL_DOCKER_SETUP.md` and `CLOUD_RUN_DEPLOYMENT.md`
- Issues: Contact development team
- Cloud Run docs: https://cloud.google.com/run/docs

## 📈 Performance

### Optimizations Applied
- Connection pooling configured
- Hibernate batch processing
- Lazy loading for relationships
- Query optimization
- Response caching ready

### Monitoring
- Spring Boot Actuator health checks
- Cloud Run metrics (when deployed)
- Custom logging for debugging

## 🎯 Roadmap

- [ ] Flyway database migrations
- [ ] Redis caching
- [ ] API rate limiting
- [ ] Swagger/OpenAPI documentation
- [ ] GraphQL support
- [ ] WebSocket support for real-time features

---

Built with ❤️ by the UrbanTitan team

