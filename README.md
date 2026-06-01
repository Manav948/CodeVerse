# 🚀 CodeVerse
**CodeVerse** is a modern developer platform designed to help programmers document their learning journey, organize development tasks, and share knowledge with the community.
It combines blogging, productivity tools, and developer utilities into a single unified ecosystem.
---
## ✨ Features
* 📝 **Developer Posts**
  Publish technical articles and share your learning journey.
* 📦 **Snippet Library**
  Save and organize reusable code snippets for quick access.
* ✅ **Task Management**
  Plan and track using webHook development tasks while building projects.
* 🏆 **Gamified Progress**
  Maintain streaks, earn badges, and climb the developer leaderboard.
* 👥 **Community Activity**
  See real-time contributions from other developers.

---
## 🛠 Tech Stack
**Frontend**
* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Framer Motion
* Lenis (Smooth Scrolling)
* Shadcn component

**Backend**
* Next.js API Routes
* Prisma ORM
* PostgreSQL

**Authentication**
* NextAuth.js
* OAuth (Google / GitHub)
---

## ⚡ Getting Started

### 1️⃣ Clone the repository
```bash
https://github.com/Manav948/CodeVerse.git
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Setup environment variables
Create a `.env` file:
```
DATABASE_URL=
NEXTAUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### 4️⃣ Run the development server
```bash
npm run dev
```
App will run on:
```
http://localhost:3000
```

---

## 🐳 Docker Setup

This project is fully dockerized with a highly optimized, secure, and production-ready multi-stage Docker build utilizing Next.js standalone mode.

### 1️⃣ Build the Docker Image
To build the Docker image, run the following command in the project root:
```bash
docker build -t codeverse:latest .
```

### 2️⃣ Run the Docker Container
Run the container and pass the required environment variables:
```bash
docker run -d \
  -p 3000:3000 \
  --name codeverse \
  -e DATABASE_URL="postgresql://user:password@host:5432/dbname" \
  -e NEXTAUTH_SECRET="your-nextauth-secret" \
  -e GOOGLE_CLIENT_ID="your-google-client-id" \
  -e GOOGLE_CLIENT_SECRET="your-google-client-secret" \
  codeverse:latest
```
*Note: Make sure to replace the dummy environment values with your actual production keys/URLs.*

### 3️⃣ Database Migrations
To run database migrations on your database using the Prisma CLI inside the running container:
```bash
docker exec -it codeverse npx prisma migrate deploy
```

---

## 🐙 Docker Compose Setup (Recommended)

Docker Compose allows you to launch the database (PostgreSQL) and the Next.js application simultaneously with a single command. It handles networking, environment configuration, persistent storage volumes, and service startup orchestration automatically.

### 1️⃣ Start the Services
To start both the application and the database in the background, run:
```bash
docker-compose up -d
```
This will build the application image, launch a PostgreSQL container, verify its health, and start the Next.js application at `http://localhost:3000`.

### 2️⃣ Run Database Migrations
After launching the services for the first time, run the Prisma migrations to initialize the database schema:
```bash
docker-compose exec app npx prisma migrate deploy
```

### 3️⃣ Stop the Services
To stop and clean up the containers while preserving your database volume data, run:
```bash
docker-compose down
```

### 4️⃣ Useful Commands
- **View logs:** `docker-compose logs -f`
- **Rebuild the app:** `docker-compose up -d --build app`
- **Access PostgreSQL CLI:** `docker-compose exec db psql -U nextjs -d codeverse`

---

## 🌍 Live Demo

Production URL:

```
https://codeverse.manavvalani.in
```
## 📁 Project Structure

```
app/
components/
providers/
lib/
prisma/
public/
```
## 📈 Future Improvements

* AI powered code assistant
* Developer portfolio profiles
* Project showcase pages
* Advanced analytics dashboard
* Real-time collaboration tools
---
## 🤝 Contributing
Contributions are welcome.
Feel free to fork the repository and submit a pull request.
---
## 📜 License
This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Manav Valani**

Building tools for developers to learn, share, and grow in public.
