

import { Hono } from 'hono';
import { analyzeJWT } from './jwt.js';

export const app = new Hono().basePath('/api');

// Add `/payload` route
app.post('/payload/*', analyzeJWT);

// General route handlers
app.get('*', (c) => c.json({ message: "This is a GET request" }));
app.post('*', (c) => c.json({ message: "This is a POST request" }));
app.patch('*', (c) => c.json({ message: "This is a PATCH request" }));
app.put('*', (c) => c.json({ message: "This is a PUT request" }));
app.options('*', (c) => c.json({ message: "This is an OPTIONS request" }));


export default app;
