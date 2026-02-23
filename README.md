# 💼 Job Portal App (Enterprise Edition)

🌐 **Live Demo:** [https://job-portal-git-main-ahmadraza993432-gmailcoms-projects.vercel.app/](https://job-portal-git-main-ahmadraza993432-gmailcoms-projects.vercel.app/)

A modern **full-stack MERN-based Job Portal** that connects **job seekers (candidates)** and **recruiters**.  
Featuring premium glassmorphic SaaS animations, a fully responsive interface, and strictly protected **role-based dashboards**, the platform enables seamless **job posting, database-level search & filtering, application management, and tracking** — built for production scale.

---

## ✨ Enterprise Features

### �️ Production Security & Architecture
- **Fail-Fast Environment Guards**: Server immediately validates configuration on boot.
- **Rate Limiting**: `express-rate-limit` prevents brute-force credential stuffing.
- **Server-Side Pagination & Text Search**: Replaced all client-side array leaks with optimized MongoDB `$search`, regex indexing, and dynamic `skip`/`limit` pipelines.

### �🔐 Authentication & Access Control
- JWT-based secure login and registration with HTTP-only cookies.
- Complete frontend input validation to prevent zero-payload DB queries.
- Role-based dashboards: **Candidate** & **Recruiter**

### 🎓 Candidate Dashboard
- Advanced keyword, location, and industry search filters.
- Apply to jobs with one click.
- Persistent state management across browser sessions (`redux-persist`).

### 🧑‍💼 Recruiter Dashboard
- Post new job listings with safe constraint verification.
- Manage applications per job seamlessly.
- Edit/Delete job postings safely.

### 🌐 UI/UX Redesign
- Custom **Glassmorphism** and soft-shadow aesthetics.
- Built with **Tailwind CSS** & **shadcn/ui**
- Micro-interactions powered by **Framer Motion** for premium transitions.
- Fully responsive: mobile, tablet, to desktop.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **Redux Toolkit** + `redux-persist`
- **Tailwind CSS**
- **shadcn/ui**
- **Framer Motion**
- **Lucide React** (Icons)
- **Sonner** (Toast Notifications)

### Backend
- **Node.js**
- **Express.js** 
- **MongoDB** + **Mongoose**
- **JWT** (Authentication)
- **express-rate-limit** (Security)
- **Helmet** & **Cors**

---

## � Local Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ahmad18697/Job-Portal.git
   cd Job-Portal
   ```

2. **Setup Backend (`/Server`):**
   ```bash
   cd Server
   npm install
   ```
   *Create a `.env` file in `/Server` and include:*
   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_cluster_url
   SECRET_KEY=your_secure_jwt_secret
   CLIENT_URL=http://localhost:5173
   ```
   *Start the Backend:*
   ```bash
   npm run dev
   ```

3. **Setup Frontend (`/Client`):**
   ```bash
   cd ../Client
   npm install
   ```
   *Start the Frontend:*
   ```bash
   npm run dev
   ```

4. **Access the Application:** Open `http://localhost:5173` in your browser.
