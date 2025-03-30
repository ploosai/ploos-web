import { drizzle } from 'drizzle-orm/neon-serverless';
import { neon } from '@neondatabase/serverless';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Check if .env file exists and load it manually
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n');
  
  for (const line of envLines) {
    if (line && !line.startsWith('#')) {
      const [key, value] = line.split('=');
      if (key && value) {
        process.env[key.trim()] = value.trim().replace(/^"|"$/g, '');
      }
    }
  }
}

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

// Create the neon client
const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

console.log('Connected to database');

// Log database URL but mask the password
const maskedUrl = process.env.DATABASE_URL.replace(
  /(postgresql:\/\/[^:]+:)([^@]+)(@.+)/,
  '$1*****$3'
);
console.log(`Using database: ${maskedUrl}`);

// This is a placeholder for future migration setup
console.log('Database setup completed'); 