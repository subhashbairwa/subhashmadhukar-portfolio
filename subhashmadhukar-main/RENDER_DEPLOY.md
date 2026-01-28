# Deploying to Render

## Prerequisites
- GitHub account with this repository
- Render account (https://render.com)

## Steps to Deploy

### 1. Connect GitHub Repository to Render
- Go to https://dashboard.render.com
- Click "New +" and select "Web Service"
- Select "Build and deploy from a Git repository"
- Click "Connect account" to authorize GitHub
- Select this repository (`subhashmadhukar-main`)
- Click "Connect"

### 2. Configure Build Settings
The deployment is configured via `render.yaml`. You can customize these settings:

**Service Details:**
- **Name:** portfolio
- **Environment:** Node
- **Region:** Choose your preferred region
- **Branch:** main (or your default branch)

**Build Command:**
```
npm install && npm run build
```

**Start Command:**
```
npm run preview
```

### 3. Environment Variables
The following is already configured in `render.yaml`:
- `NODE_ENV`: production

### 4. Deploy
- Click "Create Web Service"
- Render will automatically start building your project
- Once the build completes, your site will be live at: `https://your-service-name.onrender.com`

## Manual Redeploy
To trigger a new deployment:
1. Go to your service on Render dashboard
2. Click "Manual Deploy" → "Deploy latest commit"

## Important Notes

- **Build Time:** First deployment may take 5-10 minutes
- **Vite Configuration:** The app uses Vite with React and shadows an existing vite preview configuration
- **Node Version:** Uses Node.js LTS by default on Render
- **Bun Lock:** The project uses `bun.lockb`. Render will handle this automatically with npm

## Troubleshooting

### Build Fails
- Check the build logs in Render dashboard
- Ensure all dependencies are listed in `package.json`
- Run `npm run build` locally to test

### Site Not Loading
- Check that the start command is correct
- Verify environment variables are set
- Check the live logs on Render dashboard

### Port Issues
- Render automatically assigns a port via `PORT` environment variable
- The preview server runs on port 4173 by default in Vite

## Next Steps
- Add a custom domain (optional)
- Set up automatic redeploys on git push (automatic by default)
- Configure environment variables for production if needed
