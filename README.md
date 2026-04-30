# Perplexity From Scratch

A full-stack AI-powered search engine clone inspired by Perplexity AI. This project utilizes a modern tech stack to provide fast, real-time search results with AI-generated summaries and citations.

## 🚀 Tech Stack

### Backend
- **Runtime:** [Bun](https://bun.sh)
- **Framework:** Express.js
- **ORM:** Prisma with PostgreSQL
- **AI Integration:** AI SDK (Groq)
- **Search API:** Tavily
- **Auth & Database:** Supabase

### Frontend
- **Framework:** React 19
- **Styling:** TailwindCSS
- **Routing:** React Router 7
- **Icons & UI:** Lucide React, Markdown rendering

## 🛠️ Getting Started

### Prerequisites
- [Bun](https://bun.sh) installed on your machine.
- A PostgreSQL database (or Supabase project).
- API Keys for Tavily and Groq.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Perplexity-From-Scratch
   ```

2. Install dependencies for both backend and frontend:
   ```bash
   # Install backend dependencies
   cd backend
   bun install

   # Install frontend dependencies
   cd ../frontend
   bun install
   ```

3. Configure environment variables:
   Create a `.env` file in the `backend` directory with the following:
   ```env
   DATABASE_URL="your-postgresql-url"
   Tavily_API_KEY="your-tavily-api-key"
   SUPABASE_URL="your-supabase-url"
   SUPABASE_API_SECRET="your-supabase-service-role-key"
   GROQ_API_KEY="your-groq-api-key"
   ```

4. Database Setup:
   ```bash
   cd backend
   bunx prisma generate
   bunx prisma db push
   ```

### Running the Application

**Start the Backend:**
```bash
cd backend
bun run index.ts
```

**Start the Frontend:**
```bash
cd frontend
bun dev
```

The application should now be running at `http://localhost:3000` (frontend) and `http://localhost:5000` (backend, default port).

## 📁 Project Structure

Below is the project structure as generated in `project_structure.md`:

```
Perplexity-From-Scratch/
├── 📂 backend/
│   ├── 🟡 🚫 **.gitignore**
│   ├── 📄 bun.lock
│   ├── 🔷 client.ts
│   ├── 🔷 db.ts
│   ├── 📂 generated/
│   │   └── 📂 prisma/
│   │   │   ├── 🔷 browser.ts
│   │   │   ├── 🔷 client.ts
│   │   │   ├── 🔷 commonInputTypes.ts
│   │   │   ├── 🔷 enums.ts
│   │   │   ├── 📂 internal/
│   │   │   │   ├── 🔷 class.ts
│   │   │   │   ├── 🔷 prismaNamespace.ts
│   │   │   │   └── 🔷 prismaNamespaceBrowser.ts
│   │   │   ├── 📂 models/
│   │   │   │   ├── 🔷 Conversation.ts
│   │   │   │   ├── 🔷 Message.ts
│   │   │   │   └── 🔷 User.ts
│   │   │   └── 🔷 models.ts
│   ├── 🔷 index.ts
│   ├── 🔷 middleware.ts
│   ├── 🔴 📦 **package.json**
│   ├── 📂 prisma/
│   │   ├── 📂 migrations/
│   │   │   ├── 📂 20260426163151_init/
│   │   │   │   └── 📄 migration.sql
│   │   │   ├── 📂 20260427164602_added_unique_const/
│   │   │   │   └── 📄 migration.sql
│   │   │   ├── 📂 20260428205931_add_cascade_delete/
│   │   │   │   └── 📄 migration.sql
│   │   │   ├── 📂 20260428212341_removed_cascade_on_delete/
│   │   │   │   └── 📄 migration.sql
│   │   │   └── ⚙️ migration_lock.toml
│   │   ├── 📄 schema.prisma
│   │   └── 🔷 seed.ts
│   ├── 🔷 prisma.config.ts
│   ├── 🔷 prompt.ts
│   ├── 🔴 📖 **README.md**
│   └── 🟡 🔷 **tsconfig.json**
└── 📂 frontend/
│   ├── 🟡 🚫 **.gitignore**
│   ├── 🔷 build.ts
│   ├── 🔷 bun-env.d.ts
│   ├── 📄 bun.lock
│   ├── ⚙️ bunfig.toml
│   ├── 🔴 📦 **package.json**
│   ├── 🔴 📖 **README.md**
│   ├── 📁 src/
│   │   ├── ⚛️ App.tsx
│   │   ├── ⚛️ frontend.tsx
│   │   ├── 🎨 index.css
│   │   ├── 🌐 index.html
│   │   ├── 🔷 index.ts
│   │   ├── 📚 lib/
│   │   │   └── 🔷 config.ts
│   │   ├── 📄 pages/
│   │   │   ├── ⚛️ Auth.tsx
│   │   │   └── ⚛️ Dashboard.tsx
│   │   └── 🔧 utils/
│   │   │   └── 🔷 supabase.ts
│   └── 🟡 🔷 **tsconfig.json**
```

## 📜 License

MIT
