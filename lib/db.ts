import { neon } from "@neondatabase/serverless";

// 🛡️ WEBPACK-SAFE SERVERLESS LEDGER CONNECTOR ADAPTER
// Maps a valid empty structural fallback string if env variables are hidden during build time
const connectionString = process.env.DATABASE_URL || "postgresql://webpack_bypass:dummy_key@localhost/neondb";

if (!process.env.DATABASE_URL) {
  console.warn("⚠️ DATABASE_URL configuration string is missing from build perimeters.");
}

// Export the query helper connection tool with absolute type safety
export const sql = neon(connectionString);

