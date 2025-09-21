import express from 'express';
import cors from 'cors';
import pkg from 'pg';
const { Client } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

// Add this at the top of your file to prefer IPv4
import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

const client = new Client({
  host: 'db.vegkphzwxjmazpzkofex.supabase.co',
  port: 5432,
  user: 'postgres',
  password: 'Swamygowda32',
  database: 'postgres',
  ssl: { rejectUnauthorized: false },
  // Add connection timeout
  connectionTimeoutMillis: 10000,
});

// Handle connection with proper error handling
client.connect()
  .then(() => {
    console.log('Connected to Supabase!');
    
    app.get('/products', async (req, res) => {
      try {
        const result = await client.query('SELECT * FROM public.products ORDER BY id ASC');
        res.json(result.rows);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch products' });
      }
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });