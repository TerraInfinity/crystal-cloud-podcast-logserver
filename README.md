
# LogVista Guardian

A modern web application for viewing and analyzing both backend and frontend logs.

## Features

- Separate views for backend and frontend logs
- Filterable and searchable logs
- Expandable log details for additional data
- Dark theme with color-coded log levels
- Responsive design that works on all screen sizes
- Secure API endpoints for posting logs

## Tech Stack

- React with TypeScript
- TailwindCSS & shadcn/ui for styling
- React Query for data fetching
- Supabase for database storage
- Vercel for hosting and serverless functions

## Supabase Setup

### Database Setup

Create two tables in your Supabase project:

1. `backend_logs`
2. `frontend_logs`

Each table should have the following schema:

```sql
create table backend_logs (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now(),
  level text not null,
  message text not null,
  data jsonb
);

create table frontend_logs (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default now(),
  level text not null,
  message text not null,
  data jsonb
);
```

Make sure to set appropriate RLS (Row Level Security) policies for these tables.

## Environment Variables

Create a `.env` file based on the `.env.example` file with the following variables:

```
SUPABASE_URL=your-supabase-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-anon-key
VITE_API_KEY=your-api-key-for-log-endpoints
```

## Deploying to Vercel

1. Push this project to a GitHub repository
2. Connect the repository to Vercel
3. Configure the environment variables in Vercel project settings
4. Deploy the project

## Using the Log API

To send logs to the API:

### Backend Logs

```bash
curl -X POST https://your-domain.com/api/backend-log \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d '{"level": "info", "message": "This is a test log", "data": {"user": "test"}}'
```

### Frontend Logs

```bash
curl -X POST https://your-domain.com/api/frontend-log \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d '{"level": "error", "message": "Failed to load resource", "data": {"url": "/api/test"}}'
```

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the required variables
4. Start the development server: `npm run dev`
