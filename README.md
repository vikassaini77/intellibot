# IntelliBot PRO

![IntelliBot Nexus](https://via.placeholder.com/1200x400/05060A/00E5FF?text=IntelliBot+Nexus)

IntelliBot PRO is a next-generation, full-stack AI Chat platform. Designed with a stunning cinematic user interface and powered by a robust Python AI backend, it provides a premium experience for conversational AI and document analysis.

## 🌟 Key Features

*   **Cinematic UI/UX:** A highly polished, glassmorphic Next.js frontend with smooth Framer Motion animations.
*   **Dual-Stack Architecture:** 
    *   **Frontend:** Next.js 14 (App Router), React, Tailwind CSS, NextAuth, and Prisma (SQLite).
    *   **Backend:** Python, Flask, Custom AI Models for Natural Language Processing (NLP).
*   **Secure Authentication:** Complete Sign In and Sign Up flows with secure password hashing (`bcrypt`) and local database storage.
*   **Intelligent Chat Interface:** 
    *   Organize conversations with Folders.
    *   Pin favorite chats for quick access.
    *   Real-time chat interactions seamlessly bridged between Next.js and Python.
*   **Document Parsing:** Upload PDFs and text documents, parse their contents, and chat with your documents contextually.
*   **Text-to-Speech:** Integrated browser APIs to vocalize AI responses seamlessly.

---

## 🏗️ Project Structure

The project has been elegantly structured into two main domains:

```text
/intellibot-main
│
├── /frontend               # Next.js UI Application
│   ├── /app                # Next.js App Router Pages & API Routes
│   ├── /components         # Global UI Components (Buttons, Modals)
│   ├── /features           # Domain-Specific UI (Chat, Auth)
│   └── /prisma             # SQLite Database Schema
│
├── /backend                # Python AI Engine
│   ├── app.py              # Main Flask Server
│   ├── intellibot.py       # Core AI Logic
│   ├── /model              # Pre-trained ML Models
│   └── /data               # Training Data & Configurations
│
└── start.bat               # Easy one-click launcher for Windows
```

---

## 🚀 Getting Started

The easiest way to run the entire stack locally is by using the included startup script.

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18 or higher)
*   [Python](https://www.python.org/) (v3.8 or higher)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd intellibot-main
   ```

2. **Install Frontend Dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Initialize Database:**
   ```bash
   cd frontend
   npx prisma generate
   npx prisma db push
   ```

4. **Install Backend Dependencies:**
   ```bash
   cd ../backend
   pip install -r requirements.txt
   ```

### Running the Application

Simply double-click the `start.bat` file in the root directory, or run it from the command line:

```bash
./start.bat
```

This script will automatically open two terminal windows:
1.  **Frontend Server:** Running Next.js at `http://localhost:3000`
2.  **Backend Server:** Running Python Flask at `http://127.0.0.1:5001`

Navigate to `http://localhost:3000` in your browser, create an account, and start chatting!

---

## 🛠️ Technology Stack

**Frontend:**
*   Next.js (React)
*   Tailwind CSS (Styling)
*   Framer Motion (Animations)
*   Prisma (ORM / Database)
*   NextAuth.js (Authentication)

**Backend:**
*   Python 3
*   Flask
*   Custom NLP Libraries

---

## 📝 License
This project is licensed under the MIT License.
