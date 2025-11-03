# TODO: Integrate Supabase into the Project

## Backend Changes
- [x] Update package.json: Add @supabase/supabase-js dependency, remove mongoose, bcryptjs, jsonwebtoken
- [x] Create src/utils/supabase.ts for Supabase client configuration
- [x] Update server.js: Remove MongoDB connection and Mongoose setup
- [x] Archive or remove models/User.js, models/Game.js, models/Result.js (Supabase handles schemas)
- [x] Update middleware/auth.js: Replace custom JWT auth with Supabase authentication
- [x] Update routes/auth.js: Integrate Supabase auth for login, logout, me endpoints
- [x] Update routes/games.js: Replace Mongoose operations with Supabase client for games CRUD
- [x] Update routes/results.js: Replace Mongoose operations with Supabase client for results CRUD
- [x] Update api/auth/login.js, api/auth/logout.js, api/auth/me.js: Use Supabase auth
- [x] Update api/games/index.js, api/games/admin.js, api/games/[id].js: Use Supabase for games operations
- [x] Update api/results/index.js, api/results/[id].js, api/results/publish.js: Use Supabase for results operations

## Frontend Changes
- [x] Update src/utils/api.ts: Replace with Supabase client calls for data fetching
- [x] Update components (e.g., GameResult.tsx, GameChart.tsx) to use new API utility if needed

## Configuration
- [x] Create/update .env: Add Supabase URL and anon key
- [x] Update vercel.json if necessary for new routing (likely not needed)

## Followup Steps (Manual)
- [x] Create Supabase project and set up PostgreSQL tables for User, Game, Result
- [x] Migrate existing data from MongoDB to Supabase if needed
- [ ] Test authentication and data operations
- [ ] Update Vercel deployment with new environment variables
