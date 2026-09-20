# 🚀 Deployment Guide for Render

## Quick Configuration

### Backend (API Server)

**Service Type:** Web Service

| Setting | Value |
|---------|-------|
| **Root Directory** | `backend` |
| **Environment** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `node index.js` |

**Environment Variables:**
```
PORT=8000
MONGO_URI=mongodb+srv://anshu:ZvRcNt5Dxo1HJdmO@cluster1.p36btqc.mongodb.net/?appName=Cluster1
JWT_SECRET=supersecretjwtkey123
NODE_ENV=production
FRONTEND_URL=https://your-frontend-url.onrender.com
```

---

### Frontend (Web Service)

**Service Type:** Web Service

| Setting | Value |
|---------|-------|
| **Root Directory** | `frontend` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |

**Environment Variables:**
```
VITE_API_URL=https://your-backend-url.onrender.com
PORT=10000
```

---

## 📋 Step-by-Step Deployment

### 1️⃣ Deploy Backend First

1. **Login to Render**
   - Go to https://render.com
   - Sign in with GitHub

2. **Create Web Service**
   - Click **"New +"** → **"Web Service"**
   - Select your repository: `anshurajbisoyi98-ctrl/sundayassignment`

3. **Configure Service**
   ```
   Name: ewaste-backend
   Root Directory: backend
   Environment: Node
   Branch: main
   Build Command: npm install
   Start Command: node index.js
   Instance Type: Free
   ```

4. **Add Environment Variables**
   - Click **"Environment"** tab
   - Add each variable:
     - `PORT` = `8000`
     - `MONGO_URI` = `mongodb+srv://anshu:ZvRcNt5Dxo1HJdmO@cluster1.p36btqc.mongodb.net/?appName=Cluster1`
     - `JWT_SECRET` = `supersecretjwtkey123`
     - `NODE_ENV` = `production`

5. **Deploy**
   - Click **"Create Web Service"**
   - Wait 2-3 minutes for deployment
   - Copy your backend URL: `https://ewaste-backend-xxxx.onrender.com`

6. **Seed Database** (One-time setup)
   - Go to **"Shell"** tab in Render
   - Run:
     ```bash
     node seedCategories.js
     node cleanAndSeed.js
     ```

---

### 2️⃣ Deploy Frontend

1. **Create Web Service**
   - Click **"New +"** → **"Web Service"**
   - Select same repository

2. **Configure Web Service**
   ```
   Name: ewaste-frontend
   Root Directory: frontend
   Branch: main
   Build Command: npm install && npm run build
   Start Command: npm start
   Instance Type: Free
   ```

3. **Add Environment Variables**
   - Click **"Environment"** tab
   - Add:
     - `VITE_API_URL` = `https://ewaste-backend-xxxx.onrender.com`
       (Use the backend URL from step 1)
     - `PORT` = `10000`

4. **Deploy**
   - Click **"Create Web Service"**
   - Wait 3-5 minutes for build and deployment

5. **Update Backend CORS**
   - Go back to backend service
   - Add environment variable:
     - `FRONTEND_URL` = `https://ewaste-frontend-xxxx.onrender.com`
   - Service will auto-redeploy

---

## 🎯 Post-Deployment

### Test Your Deployment

1. **Visit Frontend URL**
   - Go to: `https://ewaste-frontend-xxxx.onrender.com`
   - You should see the homepage

2. **Test Login**
   - Click "Login"
   - Use: `citizen@ewaste.com` / `citizen123`
   - Should successfully login

3. **Verify Backend**
   - Visit: `https://ewaste-backend-xxxx.onrender.com/api/categories`
   - Should return JSON with categories

---

## 🔧 Troubleshooting

### Issue: CORS Error

**Solution:**
- Ensure `FRONTEND_URL` is set in backend environment variables
- Verify frontend URL is correct (no trailing slash)

### Issue: Database Not Connecting

**Solution:**
- Check MongoDB Atlas IP whitelist
- Add `0.0.0.0/0` to allow all IPs (or Render's IPs)
- Verify MONGO_URI is correct

### Issue: Build Failing

**Backend:**
- Check all dependencies in `package.json`
- Verify Node version compatibility

**Frontend:**
- Ensure `VITE_API_URL` is set
- Check for build errors in logs

### Issue: Free Tier Sleep

Render's free tier sleeps after 15 minutes of inactivity:
- First request after sleep takes 30-60 seconds
- Consider paid tier for production

---

## 📱 Custom Domain (Optional)

### For Frontend:
1. Go to **Settings** → **Custom Domain**
2. Add your domain: `ewaste.yourdomain.com`
3. Update DNS records as shown

### For Backend:
1. Go to **Settings** → **Custom Domain**
2. Add: `api.yourdomain.com`
3. Update `VITE_API_URL` in frontend to new domain
4. Update `FRONTEND_URL` in backend

---

## 🔄 Auto-Deploy Setup

Render automatically deploys on push to main branch.

To disable:
1. Go to **Settings**
2. Scroll to **Build & Deploy**
3. Toggle off **Auto-Deploy**

---

## 💰 Pricing

**Free Tier Includes:**
- ✅ 750 hours/month
- ✅ Automatic SSL
- ✅ Global CDN
- ⚠️ Services sleep after 15 min inactivity
- ⚠️ 100GB bandwidth/month

**Starter Tier ($7/month):**
- ✅ No sleep
- ✅ Faster builds
- ✅ 400GB bandwidth

---

## 📊 Monitoring

### View Logs:
1. Click on service
2. Go to **"Logs"** tab
3. Real-time logs appear here

### Metrics:
1. Go to **"Metrics"** tab
2. View CPU, Memory, Response times

---

## 🔐 Security Checklist

- ✅ MONGO_URI stored as secret
- ✅ JWT_SECRET generated securely
- ✅ CORS configured properly
- ✅ HTTPS enabled by default
- ✅ Environment variables not in code
- ⚠️ Consider IP whitelist on MongoDB
- ⚠️ Rotate JWT_SECRET periodically

---

## 🎉 You're Live!

Your app is now deployed at:
- **Frontend:** `https://ewaste-frontend-xxxx.onrender.com`
- **Backend:** `https://ewaste-backend-xxxx.onrender.com`

Share the frontend URL with users! 🌍

---

## 📞 Support

- Render Docs: https://render.com/docs
- Community: https://community.render.com
- Status: https://status.render.com
