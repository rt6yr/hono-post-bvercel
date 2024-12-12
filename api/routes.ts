import { Hono } from 'hono';

export const app = new Hono().basePath('/api');



// Handle /api/payload with JWT validation
app.post('/payload', async (c) => {
  const jwt = c.req.headers.get('Authorization')?.split(' ')[1]; // Extract token from Bearer header
  if (!jwt) {
    return c.json({ error: 'Missing or invalid JWT' }, 401);
  }

  try {
    // Example JWT validation logic
    const isValid = await validateJwt(jwt);
    if (!isValid) {
      return c.json({ error: 'Invalid JWT' }, 403);
    }

    return c.json({ message: 'Payload received and JWT validated successfully' });
  } catch (err) {
    return c.json({ error: 'JWT validation failed', details: err.message }, 500);
  }
});

// Mock JWT validation function
async function validateJwt(token) {
  // Replace this with actual JWT verification logic (e.g., using `jsonwebtoken` or `jose` library)
  if (token === 'mock-valid-token') {
    return true;
  }
  return false;
}


// Handle GET request
app.get('*', (c) => {
  return c.json({ message: "This is a GET request" });
});

// Handle POST request
app.post('*', (c) => {
  return c.json({ message: "This is a POST request" });
});

// Handle PATCH request
app.patch('*', (c) => {
  return c.json({ message: "This is a PATCH request" });
});

// Handle PUT request
app.put('*', (c) => {
  return c.json({ message: "This is a PUT request" });
});

// Handle OPTIONS request
app.options('*', (c) => {
  return c.json({ message: "This is an OPTIONS request" });
});

export default app;
