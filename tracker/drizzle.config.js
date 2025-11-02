require('dotenv').config({ path: '.env.local' });

module.exports = {
  schema: './utils/schema.jsx',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url:process.env.NEXT_PUBLIC_DATABASE_URL,
  },
};
