# Messenger Real-Time Chat Application

A production-ready real-time chat application built with Messenger, React, and Express.js. Features include real-time messaging, private messages, typing indicators, and user presence.

## 🚀 Live Demo

- **Frontend**: [\[Vercel Frontend\]](http://plpmessenger.vercel.app/)
- **Backend API**: [\[Render Backend\]](https://messenger-backend-3fl7.onrender.com)

## 📋 Features

- Real-time messaging with Messenger
- Private messaging between users
- Typing indicators
- User presence and online status
- Responsive design
- Production-ready with CI/CD pipeline
- Health monitoring and error handling

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite (build tool)
- Messenger Client
- Lucide React (icons)
- CSS3 with modern features

### Backend
- Node.js & Express.js
- Messenger Server
- Helmet (security)
- Rate limiting
- CORS configuration

### DevOps & Deployment
- GitHub Actions (CI/CD)
- Render (backend hosting)
- Vercel (frontend hosting)
- ESLint & Prettier (code quality)
- Jest & Vitest (testing)

## 🏗️ Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── socket/         # Messenger client logic
│   │   ├── config/         # Environment configuration
│   │   └── test/           # Test files
│   ├── .env.example        # Environment variables template
│   └── vercel.json         # Vercel deployment config
├── server/                 # Express.js backend
│   ├── tests/              # Backend tests
│   ├── .env.example        # Environment variables template
│   └── server.js           # Main server file
├── .github/workflows/      # CI/CD pipelines
├── scripts/                # Deployment scripts
└── render.yaml             # Render deployment config
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd socket-chat-app
   ```

2. **Set up the backend**
   ```bash
   cd server
   cp .env.example .env
   npm install
   npm run dev
   ```

3. **Set up the frontend** (in a new terminal)
   ```bash
   cd client
   cp .env.example .env
   npm install
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5001

## 🌐 Deployment

### Backend Deployment (Render)

1. **Create a Render account** at [render.com](https://render.com)

2. **Create a new Web Service**
   - Connect your GitHub repository
   - Set build command: `cd server && npm install`
   - Set start command: `cd server && npm start`
   - Set environment variables:
     ```
     NODE_ENV=production
     CLIENT_URL=https://your-frontend-url.vercel.app
     ```

3. **Deploy and get your backend URL**

### Frontend Deployment (Vercel)

1. **Create a Vercel account** at [vercel.com](https://vercel.com)

2. **Import your project**
   - Connect your GitHub repository
   - Set root directory to `client`
   - Set build command: `npm run build`
   - Set output directory: `dist`

3. **Set environment variables**
   ```
   VITE_SERVER_URL=https://your-backend-url.onrender.com
   VITE_NODE_ENV=production
   ```

4. **Deploy and get your frontend URL**

### Alternative Deployment Options

#### Backend Alternatives
- **Railway**: Connect GitHub repo, set start command
- **Heroku**: Use Heroku CLI or GitHub integration

#### Frontend Alternatives
- **Netlify**: Drag & drop `client/dist` folder or connect GitHub
- **GitHub Pages**: Use GitHub Actions workflow

## 🔧 Environment Variables

### Backend (.env)
```env
# Server Configuration
SERVER_PORT=5001
NODE_ENV=development

# Client Configuration  
CLIENT_URL=http://localhost:5173

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env)
```env
# Server Configuration
VITE_SERVER_URL=http://localhost:5001

# App Configuration
VITE_NODE_ENV=development
VITE_APP_NAME=Messenger Chat
```

## 🧪 Testing

### Run Backend Tests
```bash
cd server
npm test
```

### Run Frontend Tests
```bash
cd client
npm run test
```

### Run All Tests
```bash
# From project root
npm run test:all
```

## 📊 CI/CD Pipeline

The project includes a comprehensive GitHub Actions workflow that:

1. **Continuous Integration**
   - Runs ESLint for code quality
   - Executes test suites
   - Builds applications

2. **Continuous Deployment**
   - Deploys backend to Render
   - Deploys frontend to Vercel
   - Runs health checks

### Setting Up CI/CD

1. **Add GitHub Secrets**
   ```
   RENDER_SERVICE_ID=your-render-service-id
   RENDER_API_KEY=your-render-api-key
   VERCEL_TOKEN=your-vercel-token
   VERCEL_ORG_ID=your-vercel-org-id
   VERCEL_PROJECT_ID=your-vercel-project-id
   VITE_SERVER_URL=https://your-backend-url.onrender.com
   ```

2. **Push to main branch** to trigger deployment

## 🔍 Monitoring & Health Checks

### Health Endpoints
- **Backend Health**: `GET /api/health`
- **API Status**: `GET /`

### Monitoring Features
- Server uptime tracking
- Connected users count
- Error logging and handling
- Rate limiting protection

## 🛡️ Security Features

- Helmet.js for security headers
- CORS configuration
- Rate limiting
- Input validation
- Environment-based configuration

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if needed
5. Run the test suite
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check CLIENT_URL environment variable
   - Verify frontend URL in backend CORS config

2. **Connection Issues**
   - Ensure both frontend and backend are running
   - Check VITE_SERVER_URL in frontend

3. **Build Failures**
   - Clear node_modules and reinstall
   - Check Node.js version (18+ required)

### Getting Help

- Check the [Issues](../../issues) page
- Review deployment logs in Render/Vercel dashboards
- Verify environment variables are set correctly

## 📚 Additional Resources

- [Messenger Documentation](https://Messenger/docs/)
- [React Documentation](https://react.dev/)
- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs) 