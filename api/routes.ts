import { Hono } from 'hono';
const app = new Hono().basePath('/api');

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
