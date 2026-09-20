# 🚀 Setting Up From GitHub

## Clone the Repository

```bash
git clone https://github.com/anshurajbisoyi98-ctrl/sundayassignment.git
cd sundayassignment
```

## Setup Backend

```bash
cd backend
npm install
```

**Create `.env` file** in `backend/` folder:
```env
PORT=8000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key_here
```

**Seed the database**:
```bash
node seedCategories.js
node cleanAndSeed.js
```

**Start backend**:
```bash
npm run dev
```
✅ Backend running at: http://localhost:8000

## Setup Frontend

Open new terminal:
```bash
cd frontend
npm install
npm run dev
```
✅ Frontend running at: http://localhost:5173

## Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@ewaste.com | admin123 |
| Agent | agent@ewaste.com | agent123 |
| Citizen | citizen@ewaste.com | citizen123 |

## Done! 🎉

Visit: http://localhost:5173
