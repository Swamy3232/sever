import express from 'express';
import cors from 'cors';
import { Client } from 'pg';
import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');


const app = express();
app.use(cors());
app.use(express.json());

const client = new Client({
  host: 'db.vegkphzwxjmazpzkofex.supabase.co',
  port: 5432,
  user: 'postgres',
  password: 'Swamygowda32',
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
});

// Connect once at startup
await client.connect();
console.log('Connected to Supabase!');

// GET /products - fetch all products
app.get('/products', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM public.products ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// POST /products - insert a product
app.post('/products', async (req, res) => {
  const { name, description, price, image_url } = req.body;
  try {
    const result = await client.query(
      'INSERT INTO public.products (name, description, price, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, image_url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to insert product' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
