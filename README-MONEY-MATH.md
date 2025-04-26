# Money Math Activities with Database

This guide explains how to set up and deploy the Money Math activities with a Vercel Postgres database.

## Overview

The Money Math section features interactive educational activities that teach financial concepts through engaging math exercises. The activities are now stored in a PostgreSQL database, allowing for:

- Dynamic content updates without code changes
- User progress tracking
- Achievement systems
- Enhanced customization

## Local Development Setup

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd your-repo-directory
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up local environment**

Create a `.env` file with your database connection string:

```
# Local development
DATABASE_URL="postgresql://username:password@localhost:5432/money_math_db?schema=public"
```

4. **Initialize the database**

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (development only)
npm run db:push

# Seed the database with initial activities
npm run db:seed
```

5. **Start development server**

```bash
npm run dev
```

## Database Schema

The database includes the following main models:

- **Activity**: Core educational activities (e.g., "Compound Interest Explorer")
- **Feature**: Bullet points highlighting what users will learn
- **Exercise**: Individual exercises within an activity
- **User**: User profiles and authentication data
- **UserProgress**: Tracks user progress through activities
- **Achievement**: Badges and rewards users can earn

## Vercel Deployment

Follow these steps to deploy with Vercel Postgres:

1. **Push your code to GitHub**

2. **Create a new project on Vercel**
   - Connect your GitHub repository
   - Configure your project settings

3. **Add a PostgreSQL database**
   - In your Vercel dashboard, navigate to the "Storage" tab
   - Click "Create" and select "Postgres"
   - Follow the setup wizard to create your database

4. **Link your database to your project**
   - In the database settings, find the "Connection String"
   - Add it to your project's environment variables as `DATABASE_URL`

5. **Configure build settings**
   - Vercel should automatically detect the Next.js framework
   - The `vercel.json` file already includes the necessary build commands

6. **Deploy your application**
   - Vercel will build and deploy your application
   - The first build will include database schema creation

7. **Seed your production database**
   - In the Vercel dashboard, go to your project
   - Navigate to "Deployments" → Latest Deployment → "..." menu → "Redeploy"
   - Enable "With Seed Data" option if available, or:
   - Use the Vercel CLI to run the seed command:
     ```bash
     vercel env pull .env.production.local
     npx prisma db seed
     ```

## Adding New Activities

To add new activities to the database:

1. Create a new activity entry in the `seed.ts` file
2. Run `npm run db:seed` to update your local database
3. For production, either:
   - Re-seed the production database using Vercel CLI
   - Use a database management UI like Prisma Studio to add content
   - Create an admin interface for content management (future enhancement)

## Future Enhancements

- User authentication system
- Admin dashboard for content management
- Advanced analytics for student progress
- Customizable difficulty levels
- Multiplayer/classroom features

## Troubleshooting

**Database Connection Issues**
- Verify your connection string in environment variables
- Check that IP restrictions allow your connection
- Ensure you've generated the Prisma client (`npx prisma generate`)

**Missing Activities**
- Verify the database was seeded correctly (`npm run db:seed`)
- Check the API responses in the browser developer tools
- Review the Prisma schema for any changes that might require migration

## Support

For issues or feature requests, please open an issue on the GitHub repository.