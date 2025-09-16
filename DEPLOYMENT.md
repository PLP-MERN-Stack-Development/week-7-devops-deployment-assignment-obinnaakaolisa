# 🚀 Deployment Guide

This guide covers deploying the Socket.io Chat Application to production environments.

## 📋 Prerequisites

- Node.js 18+
- Git
- Accounts on deployment platforms (Render, Vercel, etc.)
- GitHub repository with the application code

## 🌐 Deployment Options

### Option 1: Render + Vercel (Recommended)

#### Backend Deployment (Render)

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure service:
     ```
     Name: socket-chat-backend
     Environment: Node
     Build Command: cd server && npm install
     Start Command: cd server && npm start
     ```

3. **Set Environment Variables**
   ```
   NODE_ENV=production
   SERVER_PORT=10000
   CLIENT_URL=https://your-app.vercel.app
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL: `https://your-app.onrender.com`

#### Frontend Deployment (Vercel)

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     ```
     Framework Preset: Vite
     Root Directory: client
     Build Command: npm run build
     Output Directory: dist
     ```

3. **Set Environment Variables**
   ```
   VITE_SERVER_URL=https://your-app.onrender.com
   VITE_NODE_ENV=production
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Note your frontend URL: `https://your-app.vercel.app`

### Option 2: Railway + Netlify

#### Backend Deployment (Railway)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy from GitHub**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway will auto-detect Node.js

3. **Configure Service**
   - Set start command: `cd server && npm start`
   - Add environment variables:
     ```
     NODE_ENV=production
     CLIENT_URL=https://your-app.netlify.app
     ```

4. **Get URL**
   - Railway will provide a URL like: `https://your-app.railway.app`

#### Frontend Deployment (Netlify)

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Deploy Site**
   - Click "New site from Git"
   - Connect GitHub and select repository
   - Configure:
     ```
     Base directory: client
     Build command: npm run build
     Publish directory: client/dist
     ```

3. **Set Environment Variables**
   ```
   VITE_SERVER_URL=https://your-app.railway.app
   VITE_NODE_ENV=production
   ```

### Option 3: Docker Deployment

#### Using Docker Compose

1. **Build and Run**
   ```bash
   # Build images
   docker-compose build
   
   # Start services
   docker-compose up -d
   
   # View logs
   docker-compose logs -f
   ```

2. **Production Docker Compose**
   ```yaml
   version: '3.8'
   services:
     backend:
       build: ./server
       ports:
         - "5001:5001"
       environment:
         - NODE_ENV=production
         - CLIENT_URL=https://your-domain.com
     
     frontend:
       build: ./client
       ports:
         - "80:80"
       depends_on:
         - backend
   ```

## 🔧 CI/CD Setup

### GitHub Actions Configuration

1. **Add Repository Secrets**
   - Go to GitHub repository → Settings → Secrets and variables → Actions
   - Add the following secrets:

   ```
   # Render
   RENDER_SERVICE_ID=srv-xxxxxxxxxxxxx
   RENDER_API_KEY=rnd_xxxxxxxxxxxxx
   
   # Vercel
   VERCEL_TOKEN=xxxxxxxxxxxxx
   VERCEL_ORG_ID=team_xxxxxxxxxxxxx
   VERCEL_PROJECT_ID=prj_xxxxxxxxxxxxx
   
   # Environment
   VITE_SERVER_URL=https://your-backend.onrender.com
   BACKEND_URL=https://your-backend.onrender.com
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

2. **Workflow Triggers**
   - Push to `main` branch triggers deployment
   - Pull requests trigger CI tests only
   - Manual workflow dispatch available

### Getting API Keys

#### Render API Key
1. Go to Render Dashboard → Account Settings
2. Click "API Keys" → "Create API Key"
3. Copy the key and service ID from your service URL

#### Vercel Tokens
1. Go to Vercel Dashboard → Settings → Tokens
2. Create new token with appropriate scope
3. Get Org ID and Project ID from project settings

## 🔍 Monitoring Setup

### Health Checks

The application includes built-in health endpoints:

- **Backend**: `GET /api/health`
- **Frontend**: `GET /health` (via nginx)

### Uptime Monitoring

1. **UptimeRobot** (Free)
   - Add monitors for both frontend and backend
   - Set check interval to 5 minutes
   - Configure email/SMS alerts

2. **Pingdom** (Paid)
   - More detailed monitoring
   - Performance insights
   - Global monitoring locations

### Error Tracking

1. **Sentry Integration**
   ```bash
   # Install Sentry
   npm install @sentry/node @sentry/react
   ```

2. **Configure Backend**
   ```javascript
   const Sentry = require('@sentry/node');
   
   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     environment: process.env.NODE_ENV,
   });
   ```

3. **Configure Frontend**
   ```javascript
   import * as Sentry from '@sentry/react';
   
   Sentry.init({
     dsn: process.env.VITE_SENTRY_DSN,
     environment: process.env.VITE_NODE_ENV,
   });
   ```

## 🛡️ Security Checklist

### Environment Variables
- [ ] All sensitive data in environment variables
- [ ] No hardcoded secrets in code
- [ ] Different configs for dev/staging/prod

### HTTPS
- [ ] SSL certificates configured
- [ ] HTTP redirects to HTTPS
- [ ] Secure cookie settings

### Headers
- [ ] Security headers configured (Helmet.js)
- [ ] CORS properly configured
- [ ] CSP headers set

### Rate Limiting
- [ ] API rate limiting enabled
- [ ] WebSocket connection limits
- [ ] DDoS protection

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**
   ```
   Error: Access to XMLHttpRequest blocked by CORS policy
   ```
   **Solution**: Update `CLIENT_URL` in backend environment variables

2. **Socket Connection Failed**
   ```
   Error: WebSocket connection failed
   ```
   **Solution**: Check `VITE_SERVER_URL` in frontend environment variables

3. **Build Failures**
   ```
   Error: Module not found
   ```
   **Solution**: Clear node_modules and reinstall dependencies

4. **Health Check Failures**
   ```
   Error: Health check timeout
   ```
   **Solution**: Verify service is running and health endpoint is accessible

### Debugging Steps

1. **Check Logs**
   ```bash
   # Render
   View logs in Render dashboard
   
   # Vercel
   View function logs in Vercel dashboard
   
   # Railway
   View logs in Railway dashboard
   ```

2. **Test Endpoints**
   ```bash
   # Test backend health
   curl https://your-backend.onrender.com/api/health
   
   # Test frontend
   curl https://your-frontend.vercel.app
   ```

3. **Environment Variables**
   - Verify all required variables are set
   - Check for typos in variable names
   - Ensure values are correct for production

## 📊 Performance Optimization

### Backend Optimization
- Enable gzip compression
- Implement caching strategies
- Optimize database queries
- Use connection pooling

### Frontend Optimization
- Code splitting with React.lazy()
- Image optimization
- Bundle size analysis
- CDN for static assets

### Monitoring Performance
- Set up performance monitoring
- Track Core Web Vitals
- Monitor API response times
- Set up alerts for performance degradation

## 🔄 Rollback Strategy

### Automated Rollback
- GitHub Actions can automatically rollback on health check failures
- Render and Vercel support instant rollbacks to previous deployments

### Manual Rollback
1. **Render**: Go to deployments → Select previous version → Redeploy
2. **Vercel**: Go to deployments → Select previous version → Promote to production

### Database Rollback
- Always backup database before major deployments
- Test rollback procedures in staging environment
- Document rollback steps for each deployment

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review deployment platform documentation
3. Check GitHub Actions logs for CI/CD issues
4. Verify environment variables are correctly set
5. Test locally to isolate deployment-specific issues

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Netlify Documentation](https://docs.netlify.com)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)