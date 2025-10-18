# Deployment Plan for Frontend and Backend to Vercel

## Steps to Complete
- [x] Update frontend API calls to use relative paths instead of localhost
- [x] Modify backend server.js to export the Express app for Vercel serverless deployment
- [x] Create vercel.json configuration for full-stack deployment
- [ ] Set up Git repository and push code
- [ ] Deploy to Vercel via Git integration
- [ ] Configure environment variables in Vercel (e.g., MONGODB_URI)
- [ ] Test home page (/) and admin pages (/admin/*) functionality
- [ ] Handle any CORS or deployment issues

## Notes
- Home page will be the default route (/)
- Admin pages will be accessible via React Router (/admin/login, /admin/dashboard, etc.)
- Backend API will be served under /api/* paths
- Ensure MongoDB URI is set in Vercel environment variables
