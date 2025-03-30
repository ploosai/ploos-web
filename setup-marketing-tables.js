import { drizzle } from 'drizzle-orm/neon-serverless';
import { neon } from '@neondatabase/serverless';
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

async function main() {
  try {
    // Create the neon client
    const sql = neon(process.env.DATABASE_URL);
    const db = drizzle(sql);
    
    console.log('Connected to database');
    
    // Read the SQL setup file
    const sqlPath = path.join(__dirname, 'src', 'lib', 'server', 'db', 'setup-tables.sql');
    const sqlSetup = fs.readFileSync(sqlPath, 'utf8');
    
    // Split the SQL statements
    const statements = sqlSetup.split(';').filter(s => s.trim());
    
    // Execute each statement
    for (const statement of statements) {
      if (statement.trim()) {
        console.log(`Executing: ${statement.trim().substring(0, 60)}...`);
        await sql(statement.trim());
      }
    }
    
    console.log('Tables created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up tables:', error);
    process.exit(1);
  }
}

main(); 