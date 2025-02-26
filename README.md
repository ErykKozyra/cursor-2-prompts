# NextMap - Interactive Map Application

A modern, accessible mapping application built with Next.js, featuring user authentication, interactive maps, and saved locations.

## Features

- Interactive map with search functionality
- User authentication with Supabase
- Save and manage favorite locations
- Responsive design with accessibility features
- Server-side rendering with Next.js App Router

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works fine)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Setting up Supabase

1. Create a new project in [Supabase](https://supabase.com)
2. Enable the Auth service with email and Google providers
3. Set up the database schema by running the migration:
   - Go to the SQL Editor in your Supabase dashboard
   - Copy the contents of `supabase/migrations/20240101000000_create_saved_locations_table.sql`
   - Run the SQL query to create the saved_locations table and set up permissions

Alternatively, if you have the Supabase CLI installed:

```bash
supabase link --project-ref your-project-ref
supabase db push
```

### Verifying Database Setup

Run the database check script to verify your setup:

```bash
node scripts/check-db.js
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### saved_locations Table

| Column      | Type                     | Description                   |
| ----------- | ------------------------ | ----------------------------- |
| id          | UUID                     | Primary key                   |
| user_id     | UUID                     | Foreign key to auth.users     |
| name        | TEXT                     | Location name                 |
| latitude    | DOUBLE PRECISION         | Latitude coordinate           |
| longitude   | DOUBLE PRECISION         | Longitude coordinate          |
| description | TEXT                     | Optional location description |
| created_at  | TIMESTAMP WITH TIME ZONE | Creation timestamp            |

## Troubleshooting

### Database Connection Issues

If you're experiencing errors with saving or retrieving locations:

1. Check that your Supabase URL and anon key are correct in `.env.local`
2. Verify that the `saved_locations` table exists in your Supabase database
3. Ensure that Row Level Security (RLS) policies are properly set up
4. Check that you're signed in with a valid user account

### Map Display Issues

If the map isn't displaying correctly:

1. Make sure Leaflet is properly installed: `npm install leaflet react-leaflet`
2. Check for console errors related to map icons or tiles
3. Ensure your browser allows loading content from the tile server

## Technologies Used

- Next.js 13+ with App Router
- React 18+
- TypeScript
- Tailwind CSS
- Supabase (Auth & Database)
- Leaflet (Maps)

## License

This project is licensed under the MIT License.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# cursor-2-prompts
