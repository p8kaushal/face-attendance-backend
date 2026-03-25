import pg from 'pg';
const { Pool } = pg;

let pool;

export async function initDB() {
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      external_id VARCHAR(255) UNIQUE,
      employee_id VARCHAR(50) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      face_descriptor TEXT NOT NULL,
      image_data TEXT,
      created_by VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS attendance (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      check_in TIMESTAMP NOT NULL,
      check_out TIMESTAMP,
      date DATE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Database initialized');
}

export async function query(text, params) {
  const result = await pool.query(text, params);
  return result;
}

export async function getClient() {
  return pool.connect();
}
