# 🌱 E-Waste Recycler Platform

> **A smart web application that helps people recycle electronic waste and earn rewards while making the planet greener!**

---

## 📖 What Is This Project?

Imagine you have an old laptop, broken phone, or unused cables lying around. Instead of throwing them in the trash (which harms the environment), you can use our platform to:

1. **Schedule a pickup** - Someone will come to your home to collect your e-waste
2. **Get it recycled properly** - No pollution, safe disposal
3. **Earn reward points** - Get points based on how much you recycled!

This platform connects **three types of users**:
- 👤 **Citizens** - People who want to recycle their e-waste
- 🚚 **Collection Agents** - People who collect the e-waste from homes
- 🎯 **Admins** - People who manage the whole system

---

## 🎯 Why Did We Build This?

### The Problem
- Every year, **50 million tons** of electronic waste is generated worldwide
- Only **17%** of it is recycled properly
- The rest pollutes our environment with toxic chemicals
- People don't recycle because it's inconvenient

### Our Solution
- **Easy online scheduling** - Book a pickup from home
- **Gamification** - Earn points for recycling
- **Transparent tracking** - Know exactly what happens to your waste
- **Professional collection** - Trained agents handle everything

---

## ✨ Key Features Explained (In Simple Terms)

### For Citizens (Regular Users)
1. **Create Pickup Requests**
   - Select what you want to recycle (laptop, phone, batteries, etc.)
   - Tell us how much you have and where you live
   - Pick a date that works for you
   
2. **Track Your Request**
   - See the status: Requested → Scheduled → Collected → Recycled
   - Get notifications when status changes
   
3. **Reward Wallet**
   - Earn points when your items are recycled
   - Different items give different points (phones = 60 pts/kg, cables = 20 pts/kg)
   - View your total balance and transaction history

### For Collection Agents
1. **View Assigned Pickups**
   - See all the pickups assigned to you
   - Get addresses and contact details
   
2. **Update Status**
   - Mark when you've collected items
   - Enter the actual weight of collected items
   - Complete the recycling process
   
3. **Track Performance**
   - See how many pickups you've completed
   - View your daily/weekly stats

### For Admins (Recycling Center Managers)
1. **Manage All Requests**
   - See every pickup request in the system
   - Approve or reject requests
   
2. **Assign Collection Agents**
   - Match agents with pickup locations
   - Optimize routes and schedules
   
3. **View Analytics**
   - Total weight collected across platform
   - Category-wise breakdown (how many laptops, phones, etc.)
   - Area-wise statistics
   - See trends and performance

---

## 🗂️ What Can You Recycle?

We accept 8 categories of electronic waste:

| Category | Examples | Reward Points |
|----------|----------|---------------|
| 💻 **Laptops & Computers** | Desktop, laptop, CPU | **50 pts/kg** |
| 📱 **Mobiles & Tablets** | Smartphones, iPads | **60 pts/kg** |
| 🖥️ **TVs & Monitors** | LED TV, computer monitor | **30 pts/kg** |
| 🔋 **Batteries** | Phone batteries, power banks | **40 pts/kg** |
| 🔌 **Cables & Chargers** | Phone chargers, USB cables | **20 pts/kg** |
| 🖨️ **Printers & Scanners** | Home printer, office scanner | **35 pts/kg** |
| 🏠 **Home Appliances** | Microwave, toaster, iron | **25 pts/kg** |
| 🎧 **Electronic Accessories** | Headphones, keyboards, mouse | **15 pts/kg** |

---

## 🔄 How The System Works (Step by Step)

### Step 1: Citizen Creates Request
```
John has an old laptop (2 kg) to recycle
↓
Logs into the platform
↓
Fills form: "Laptop, 2kg, Home Address, Tomorrow"
↓
Clicks "Submit Request"
↓
Status: REQUESTED ✅
```

### Step 2: Admin Assigns Agent
```
Admin sees John's request
↓
Checks which agents are available
↓
Assigns "Agent Sarah" to pick up from John
↓
Status changes to: SCHEDULED 📅
↓
John gets notification
```

### Step 3: Agent Collects
```
Sarah goes to John's home
↓
Picks up the 2kg laptop
↓
Weighs it (actual weight: 2.1 kg)
↓
Marks status as: COLLECTED ✅
```

### Step 4: Recycling & Rewards
```
Sarah delivers laptop to recycling center
↓
Marks as: RECYCLED ♻️
↓
System calculates: 2.1 kg × 50 pts/kg = 105 points
↓
Points added to John's wallet automatically
↓
John sees: "You earned 105 points! 💰"
```

---

## 🏗️ Technical Architecture (Behind The Scenes)

### Frontend (What You See)
- **Technology**: React (like building blocks for websites)
- **Styling**: Tailwind CSS (makes it look beautiful)
- **State Management**: Redux (remembers your data)
- **Routing**: React Router (switches between pages)

**Think of it like**: The frontend is like the dashboard of a car - buttons, displays, and controls you interact with.

### Backend (The Engine)
- **Technology**: Node.js + Express (handles all the logic)
- **Database**: MongoDB (stores all data)
- **Security**: JWT tokens (like a secure ID card)
- **API**: RESTful (how frontend talks to backend)

**Think of it like**: The backend is like the car's engine - you don't see it, but it does all the hard work.

### Database Structure
```
Users Collection
├── Citizens (name, email, password, role)
├── Agents (name, email, password, role)
└── Admins (name, email, password, role)

Categories Collection
└── E-waste types (name, points per kg)

Pickup Requests Collection
├── Who requested (citizen)
├── What item (category)
├── How much (weight)
├── Where (address)
├── When (date)
├── Status (requested/scheduled/collected/recycled)
└── Who's collecting (agent)

Reward Wallets Collection
├── User
├── Current balance
└── Transaction history
```

---

## 🚀 Getting Started (For Developers)

### Prerequisites
Before you start, install these on your computer:
- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** account - [Sign up at MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Installation Steps

1. **Open Terminal** and navigate to the project folder
   ```bash
   cd /Users/anshu/Desktop/19sepproject
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Setup Database**
   - The `.env` file in backend folder already has your MongoDB connection
   - Seed the database with categories and test users:
   ```bash
   cd backend
   node seedCategories.js
   node cleanAndSeed.js
   ```

5. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   ✅ Backend running at: http://localhost:8000

6. **Start Frontend Server** (Open new terminal)
   ```bash
   cd frontend
   npm run dev
   ```
   ✅ Frontend running at: http://localhost:5173

7. **Open Your Browser**
   - Go to: http://localhost:5173
   - You should see the beautiful homepage!

---

## 👥 Test Accounts (Ready to Use)

After running `cleanAndSeed.js`, these accounts are created:

| Role | Email | Password | What You Can Do |
|------|-------|----------|----------------|
| 🎯 **Admin** | admin@ewaste.com | admin123 | View all requests, assign agents, see analytics |
| 🚚 **Agent** | agent@ewaste.com | agent123 | View assigned pickups, update status |
| 👤 **Citizen** | citizen@ewaste.com | citizen123 | Create pickup requests, earn rewards |

### Try This Flow:
1. Login as **citizen** → Create a pickup request
2. Login as **admin** → Assign the request to an agent
3. Login as **agent** → Mark as collected, then recycled
4. Login as **citizen** again → See your reward points! 💰

---

## 📱 How To Use The Platform

### As a Citizen

**1. Register**
- Click "Register" button
- Enter your name, email, password
- Select role: "Citizen"
- Click "Register"

**2. Create Pickup Request**
- You'll see your dashboard
- Fill the form on left side:
  - Select item category (e.g., "Laptops & Computers")
  - Enter quantity (e.g., 2 items)
  - Enter weight (e.g., 3 kg)
  - Enter your address
  - Pick a date
- Click "Submit Request"

**3. Track Your Request**
- See all your requests on the right side
- Status will update: Requested → Scheduled → Collected → Recycled

**4. Check Your Rewards**
- Top section shows your reward wallet
- See your points balance
- View transaction history

### As an Admin

**1. Login**
- Email: admin@ewaste.com
- Password: admin123

**2. View Dashboard**
- See total requests, weight collected
- View category breakdown
- Check status distribution

**3. Assign Requests**
- Scroll down to "All Pickup Requests" table
- Find requests with status "REQUESTED"
- Select an agent from dropdown
- Click "Assign"

### As a Collection Agent

**1. Login**
- Email: agent@ewaste.com
- Password: agent123

**2. View Assignments**
- See all pickups assigned to you
- View details: address, weight, date

**3. Update Status**
- Mark as "COLLECTED" after picking up
- Enter final weight if different
- Mark as "RECYCLED" after processing

---

## 🎨 User Interface Highlights

### Homepage (When Not Logged In)
- **Hero Section**: Big title, animated background, CTA buttons
- **How It Works**: 3-step process visualization
- **Categories**: All 8 e-waste types with points
- **Features**: Platform capabilities
- **Call to Action**: Register button

### Citizen Dashboard
- **Reward Wallet**: Shows points and history (top)
- **Request Form**: Create new pickup (left)
- **My Requests**: View all requests (right)

### Agent Dashboard
- **Statistics**: Assigned, pending, completed counts
- **My Pickups**: List of all assigned items
- **Action Buttons**: Update status for each pickup

### Admin Dashboard
- **Analytics Cards**: Total requests, weight, pending, completed
- **Category Breakdown**: Requests and weight per category
- **Requests Table**: All requests with assign functionality

---

## 🔒 Security Features

- **Password Encryption**: Passwords are hashed (can't be read by anyone)
- **JWT Authentication**: Secure tokens for logged-in users
- **Role-Based Access**: Citizens can't access admin features
- **Cookie Security**: httpOnly cookies prevent attacks
- **CORS Protection**: Only allowed origins can access API

---

## 📊 Database Schema Explained

### Users Table
```javascript
{
  username: "John Doe",           // User's name
  email: "john@example.com",      // For login
  password: "hashed_password",    // Encrypted
  role: "CITIZEN",                // CITIZEN/COLLECTOR/ADMIN
  createdAt: "2026-09-20"        // When account was created
}
```

### Category Table
```javascript
{
  name: "Laptops & Computers",    // Category name
  pointsPerKg: 50,                // Reward points
  createdAt: "2026-09-20"
}
```

### Pickup Request Table
```javascript
{
  citizen: "user_id_123",         // Who requested
  agent: "user_id_456",           // Who's collecting
  itemType: "category_id_789",    // What item
  quantity: 2,                    // How many
  approxWeight: 3,                // Estimated weight (kg)
  address: "123 Main St",         // Pickup location
  preferredDate: "2026-09-25",    // When to pickup
  status: "SCHEDULED",            // Current status
  rewardPoints: 150,              // Points earned (after recycled)
  createdAt: "2026-09-20"
}
```

### Reward Wallet Table
```javascript
{
  user: "user_id_123",            // Whose wallet
  balance: 450,                   // Total points
  history: [
    {
      points: 150,                // Points in this transaction
      type: "EARNED",             // EARNED or REDEEMED
      description: "Recycling Laptops & Computers",
      date: "2026-09-20"
    }
  ]
}
```

---

## 🔌 API Endpoints Reference

### User APIs
- `POST /api/users` - Register new user
- `POST /api/users/auth` - Login
- `POST /api/users/logout` - Logout
- `GET /api/users/profile` - Get user profile
- `GET /api/users/agents` - Get all agents (admin only)

### Category APIs
- `GET /api/categories` - Get all e-waste categories

### Pickup Request APIs
- `POST /api/pickups` - Create new request
- `GET /api/pickups/my-requests` - Get citizen's requests
- `GET /api/pickups` - Get all requests (admin)
- `GET /api/pickups/assigned` - Get agent's assigned pickups
- `PUT /api/pickups/:id/assign` - Assign agent (admin)
- `PUT /api/pickups/:id/status` - Update status (agent)
- `GET /api/pickups/stats` - Get dashboard stats (admin)

### Reward Wallet APIs
- `GET /api/rewards/my-wallet` - Get user's wallet

---

## 🛠️ Project Structure

```
19sepproject/
├── backend/                    # Server-side code
│   ├── config/                # Database connection
│   ├── controllers/           # Business logic
│   ├── middlewares/           # Auth, error handling
│   ├── models/                # Database schemas
│   ├── routes/                # API endpoints
│   ├── utils/                 # Helper functions
│   ├── .env                   # Environment variables (MongoDB URL, JWT secret)
│   ├── index.js               # Main server file
│   ├── seedCategories.js      # Seed e-waste categories
│   └── cleanAndSeed.js        # Create test users
│
├── frontend/                   # Client-side code
│   ├── src/
│   │   ├── pages/             # All page components
│   │   │   ├── Homepage.jsx   # Landing page
│   │   │   ├── CitizenDashboard.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AgentDashboard.jsx
│   │   │   └── Auth/          # Login & Register
│   │   ├── redux/             # State management
│   │   │   ├── api/           # API calls
│   │   │   ├── features/      # Redux slices
│   │   │   └── store.js       # Redux store
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # Entry point
│   ├── public/                # Static assets
│   └── index.html             # HTML template
│
└── README.md                   # This file!
```

---

## 🎯 Features Checklist

✅ **User Management**
- [x] Register with role selection
- [x] Secure login/logout
- [x] Role-based dashboards

✅ **Citizen Features**
- [x] Create pickup requests
- [x] Track request status
- [x] View reward wallet
- [x] Transaction history

✅ **Collection Agent Features**
- [x] View assigned pickups
- [x] Update collection status
- [x] Record final weights
- [x] Performance stats

✅ **Admin Features**
- [x] View all requests
- [x] Assign agents
- [x] Analytics dashboard
- [x] Category-wise breakdown
- [x] Status distribution

✅ **System Features**
- [x] 8 e-waste categories
- [x] Automatic point calculation
- [x] Real-time updates
- [x] Responsive design
- [x] Secure authentication

✅ **UI/UX**
- [x] Beautiful homepage
- [x] Smooth animations
- [x] Mobile responsive
- [x] Dark theme
- [x] Gradient effects

---

## 🚀 Future Enhancements (Ideas for Later)

- 📧 **Email Notifications** - Send emails when status changes
- 🗺️ **Map Integration** - Show pickup locations on map
- 📱 **Mobile App** - iOS and Android apps
- 🎁 **Point Redemption** - Redeem points for gift cards
- 🏪 **Collection Centers** - Show nearest recycling centers
- 📊 **Advanced Analytics** - More charts and graphs
- 🌍 **Multi-language** - Support different languages
- 🤖 **AI Route Optimization** - Best routes for agents

---

## ❓ Frequently Asked Questions

**Q: Do I need to pay to use this?**  
A: No! It's completely free. You actually EARN points for recycling!

**Q: How are points calculated?**  
A: Points = Weight (in kg) × Category Points  
Example: 2 kg laptop = 2 × 50 = 100 points

**Q: Can I recycle items not in the categories?**  
A: Currently, only the 8 listed categories are supported. More coming soon!

**Q: How long does pickup take?**  
A: Usually within 24-48 hours after an agent is assigned.

**Q: Are my points saved if I logout?**  
A: Yes! Your points are stored in the database permanently.

**Q: Can I become a collection agent?**  
A: Yes! Just register and select "Collection Agent" as your role.

---

## 🐛 Troubleshooting

**Problem: "Cannot connect to database"**  
- Check if MongoDB Atlas IP whitelist includes your IP
- Verify `.env` file has correct MONGO_URI

**Problem: "Port already in use"**  
- Backend: Change PORT in `.env` to different number (e.g., 8001)
- Frontend: Vite will automatically suggest different port

**Problem: "Login not working"**  
- Clear browser cookies and cache
- Check if backend server is running
- Verify test accounts were created (run `cleanAndSeed.js`)

**Problem: "Categories not showing"**  
- Run: `node seedCategories.js` in backend folder

**Problem: "Points not appearing after recycling"**  
- Status must be "RECYCLED" for points to be awarded
- Check reward wallet API endpoint is working

---

## 📞 Support

If you encounter issues:
1. Check both servers are running (backend:8000, frontend:5173)
2. Check browser console for errors (Press F12)
3. Verify database connection
4. Clear cache and cookies

---

## 📄 License

This project is built for educational purposes. Feel free to use, modify, and learn from it!

---

## 🎉 Credits

**Built with**:
- React 19 + Vite
- Node.js + Express
- MongoDB Atlas
- Tailwind CSS
- Redux Toolkit

**Created by**: Anshu Raj Bisoyi  
**Date**: September 2026

---

## 🌟 Final Words

This platform combines **technology** with **environmental responsibility**. Every electronic device recycled through this system helps:
- 🌍 Reduce environmental pollution
- ♻️ Recover valuable materials
- 💚 Promote sustainable habits
- 🎁 Reward responsible citizens

**Thank you for being part of the green revolution!** 🌱

---

**Ready to start?**  
Open http://localhost:5173 and begin your recycling journey! ♻️💚
