# CCAD Deployment Guide

## 🚀 Pre-Deployment Checklist

✅ **Code Security Fixed**
- ✅ Password hashing with bcrypt implemented
- ✅ Hardcoded MongoDB URI removed
- ✅ TypeScript compilation passes
- ✅ All dependencies installed

## 📋 Required Environment Variables

Add these to your Vercel environment variables:

```bash
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ccad

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# NextAuth Configuration (for admin authentication)
NEXTAUTH_SECRET=your_random_secret_key_minimum_32_characters
NEXTAUTH_URL=https://your-domain.vercel.app

# Environment
NODE_ENV=production
```

## 🗄️ MongoDB Atlas Setup

1. **Create Atlas Account**: https://cloud.mongodb.com/
2. **Create Free Cluster**
3. **Get Connection String**: Replace `<password>` with your actual password
4. **Database Name**: Must be `ccad` (as used in code)
5. **Create Admin User**: Run the password generation script

### Create Admin User

```bash
# Run this to generate hashed password
node scripts/create-admin.js
```

Then add the user to your MongoDB `users` collection using the output from the script.

## ☁️ Cloudinary Setup

1. **Create Account**: https://cloudinary.com/
2. **Get Credentials**: Dashboard → Settings → API Keys
3. **Copy**: Cloud Name, API Key, API Secret

## 🚀 Vercel Deployment Steps

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**: Ensure your code is in a GitHub repository
2. **Connect to Vercel**: 
   - Go to https://vercel.com/
   - Import your GitHub repository
3. **Add Environment Variables**: 
   - In Vercel dashboard → Settings → Environment Variables
   - Add all variables from the list above
4. **Deploy**: Vercel will automatically build and deploy

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables
vercel env add MONGODB_URI
vercel env add CLOUDINARY_CLOUD_NAME
# ... (add all other variables)

# Redeploy with environment variables
vercel --prod
```

## 🔒 Security Considerations

- ✅ **Passwords**: Now using bcrypt hashing
- ✅ **MongoDB URI**: No hardcoded credentials
- ✅ **Environment Variables**: All sensitive data in env vars
- ✅ **Admin Protection**: Middleware protects `/admin` routes

## 🧪 Testing After Deployment

1. **Visit Site**: https://your-domain.vercel.app
2. **Test Admin Login**: https://your-domain.vercel.app/login
3. **Test Admin Panel**: https://your-domain.vercel.app/admin
4. **Test Image Upload**: Try adding news/events with images
5. **Test Sharing**: Share a news/event and test the link

## 🎯 Admin Panel Access

- **Login URL**: `https://your-domain.vercel.app/login`
- **Username**: `admin`
- **Password**: Whatever you set in the script (default: `admin123`)

## 🐛 Common Issues & Solutions

### Build Errors
- Check all environment variables are set
- Ensure MongoDB connection string is correct
- Verify Cloudinary credentials

### Image Upload Fails
- Check Cloudinary environment variables
- Ensure file size is under 10MB
- Verify Cloudinary account quota

### Admin Login Fails
- Verify admin user exists in MongoDB `users` collection
- Check password is properly hashed
- Ensure NEXTAUTH_SECRET is set

### Database Connection Issues
- Check MongoDB Atlas IP whitelist (add 0.0.0.0/0 for Vercel)
- Verify connection string format
- Ensure database user has proper permissions

## 📞 Support

If you encounter issues:
1. Check Vercel function logs
2. Verify all environment variables
3. Test MongoDB connection separately
4. Check Cloudinary account status

---

**Your CCAD website is now production-ready! 🎉** 