# 📁 Perplexity-From-Scratch - Project Structure

*Generated on: 4/29/2026, 9:47:53 PM*

## 📋 Quick Overview

| Metric | Value |
|--------|-------|
| 📄 Total Files | 46 |
| 📁 Total Folders | 16 |
| 🌳 Max Depth | 4 levels |
| 🛠️ Tech Stack | React, TypeScript, CSS, Node.js |

## ⭐ Important Files

- 🟡 🚫 **.gitignore** - Git ignore rules
- 🔴 📦 **package.json** - Package configuration
- 🔴 📖 **README.md** - Project documentation
- 🟡 🔷 **tsconfig.json** - TypeScript config
- 🟡 🚫 **.gitignore** - Git ignore rules
- 🔴 📦 **package.json** - Package configuration
- 🔴 📖 **README.md** - Project documentation
- 🟡 🔷 **tsconfig.json** - TypeScript config

## 📊 File Statistics

### By File Type

- 🔷 **.ts** (TypeScript files): 23 files (50.0%)
- ⚙️ **.json** (JSON files): 4 files (8.7%)
- 📄 **.sql** (Other files): 4 files (8.7%)
- ⚛️ **.tsx** (React TypeScript files): 4 files (8.7%)
- 🚫 **.gitignore** (Git ignore): 2 files (4.3%)
- 📄 **.lock** (Other files): 2 files (4.3%)
- ⚙️ **.toml** (TOML files): 2 files (4.3%)
- 📖 **.md** (Markdown files): 2 files (4.3%)
- 📄 **.prisma** (Other files): 1 files (2.2%)
- 🎨 **.css** (Stylesheets): 1 files (2.2%)
- 🌐 **.html** (HTML files): 1 files (2.2%)

### By Category

- **TypeScript**: 23 files (50.0%)
- **Other**: 7 files (15.2%)
- **Config**: 6 files (13.0%)
- **React**: 4 files (8.7%)
- **DevOps**: 2 files (4.3%)
- **Docs**: 2 files (4.3%)
- **Styles**: 1 files (2.2%)
- **Web**: 1 files (2.2%)

### 📁 Largest Directories

- **root**: 46 files
- **backend**: 29 files
- **frontend**: 17 files
- **backend\generated\prisma**: 11 files
- **backend\generated**: 11 files

## 🌳 Directory Structure

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

## 📖 Legend

### File Types
- 🚫 DevOps: Git ignore
- 📄 Other: Other files
- 🔷 TypeScript: TypeScript files
- ⚙️ Config: JSON files
- ⚙️ Config: TOML files
- 📖 Docs: Markdown files
- ⚛️ React: React TypeScript files
- 🎨 Styles: Stylesheets
- 🌐 Web: HTML files

### Importance Levels
- 🔴 Critical: Essential project files
- 🟡 High: Important configuration files
- 🔵 Medium: Helpful but not essential files
