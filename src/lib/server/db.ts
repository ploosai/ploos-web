import { drizzle } from 'drizzle-orm/neon-serverless';
import { neon } from '@neondatabase/serverless';
import { 
  users, userRoles, projects, projectUsers, 
  buildings, floors, rooms, categories,
  selectionItems, selectionDependencies, selectionOptions, selectionComments
} from './schema';

// Import relations
import { 
  usersRelations, projectsRelations, projectUsersRelations, selectionItemsRelations 
} from './schema';

// Check for database URL
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error('No DATABASE_URL environment variable found. Please check your .env file.');
  // In development, provide explicit error. In production, we'll let it fail naturally
  if (process.env.NODE_ENV === 'development') {
    console.error('Current environment variables:', Object.keys(process.env).join(', '));
  }
}

// Create the neon client
const sql = neon(databaseUrl || '');

// Create the drizzle ORM client
export const db = drizzle(sql, {
  schema: {
    users,
    userRoles,
    projects,
    projectUsers,
    buildings,
    floors,
    rooms,
    categories,
    selectionItems,
    selectionDependencies,
    selectionOptions,
    selectionComments,
    usersRelations,
    projectsRelations,
    projectUsersRelations,
    selectionItemsRelations
  }
}); 