import { neon } from '@neondatabase/serverless';

// 🛡️ DECLEARS AN INTERACTIVE FAIL-SAFE DATA BUFFER STRIP
const connectionString = process.env.DATABASE_URL || "";

if (!connectionString) {
  console.warn("⚠️ DATABASE_URL configuration string is missing.");
}

// Export the query helper connection tool with type fallback tags
export const sql = neon(connectionString);

