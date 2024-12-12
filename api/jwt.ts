import jwt from 'jsonwebtoken';
import { Context } from 'hono';

const SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const analyzeJWT = async (c: Context) => {
  try {
    // Extract body data from the request
    const body = await c.req.json();
    const token = body.idToken;
    const ulidSession = body.ulidSession || 'NA';

    if (!token) {
      return c.json({ error: 'JWT token is required' }, 400);
    }

    console.log("Received JWT:", body);

    // Decode JWT without verification
    const decoded = jwt.decode(token, { complete: true });

    if (!decoded) {
      return c.json({ error: 'Invalid JWT' }, 400);
    }

    // Validate the token
    let isValid = false;
    try {
      jwt.verify(token, SECRET);
      isValid = true;
    } catch (err) {
      console.error("JWT verification failed:", err.message);
      isValid = false;
    }

    console.log("Decoded JWT:", decoded);
    console.log("Token valid:", isValid);

    // Prepare the response log
    const jwtLog = {
      idToken: token,
      header: decoded.header,
      payload: null, // Avoid storing sensitive payload data
      isValid,
      receivedAt: new Date().toISOString(),
      ulidSession,
    };

    // Log the JWT data to the console
    console.log("JWT Analysis Log:", jwtLog);

    // Return the response
    return c.json({
      received: {
        idToken: token,
      },
      processed: {
        header: decoded.header,
        isValid,
      },
      message: 'JWT successfully analyzed',
    });
  } catch (error) {
    console.error("Error processing JWT:", error.message);
    return c.json({ error: 'An error occurred', details: error.message }, 500);
  }
};
