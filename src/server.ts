import express from 'express';
import path from 'path';
import fetch from 'node-fetch';

// --- Configuration ---
const API_BASE_URL = process.env.API_BASE_URL || 'https://helloacm.com';
const PORT = process.env.PORT || 3000;
const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 1000; // 1 second base delay
// ---------------------

// Define __dirname (since we are likely running in an ES Module context via ts-node)
const __dirname = path.resolve();

const app = express();

// Serve static UI
app.use(express.static(path.join(__dirname, 'src', 'public'))); // Updated path based on file list structure

// Proxy to HelloACM timestamp API with Retry Logic
app.get('/api/convert', async (req, res) => {
  const value = req.query.s;
  if (!value) {
    return res.status(400).json({ error: 'Missing parameter s' });
  }

  const sanitizedValue = encodeURIComponent(String(value));
  const fullEndpoint = `${API_BASE_URL}/api/unix-timestamp-converter/?cached&s=${sanitizedValue}`;

  try {
    for (let i = 0; i < MAX_RETRIES; i++) {
      const resp = await fetch(fullEndpoint);
      const status = resp.status;

      if (status === 200) {
        const data = await resp.text();
        return res
          .type('application/json')
          .send(JSON.stringify({ result: data }));
      }

      if (status !== 429) {
        console.error(
          `[PROXY-FAIL] Upstream API returned status ${status} for input: ${value}`,
        );
        return res
          .status(502)
          .json({ error: `Upstream API error: Status ${status}` });
      }

      if (i < MAX_RETRIES - 1) {
        const retryAfterHeader = resp.headers.get('retry-after');
        let delayMs = 0;

        if (retryAfterHeader) {
          const retrySeconds = parseInt(retryAfterHeader, 10);
          if (!isNaN(retrySeconds)) {
            delayMs = retrySeconds * 1000;
          }
        }

        if (delayMs === 0) {
          delayMs = INITIAL_DELAY_MS * Math.pow(2, i);
          console.warn(
            `[PROXY-RETRY] Rate limit hit (429) without Retry-After. Delaying with exponential backoff: ${delayMs}ms before attempt ${i + 2} for input: ${value}`,
          );
        } else {
          console.log(
            `[PROXY-RETRY] Rate limit hit (429). Delaying based on Retry-After: ${delayMs}ms before attempt ${i + 2} for input: ${value}`,
          );
        }
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }

    console.error(
      `[PROXY-FAIL] Upstream API failed after ${MAX_RETRIES} retries due to persistent 429 error for input: ${value}`,
    );
    return res
      .status(503)
      .json({ error: 'Upstream service rate limit exceeded.' });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);

    console.error(`[PROXY-FATAL] Proxy request failed: ${errorMessage}`);
    res.status(500).json({ error: `Proxy request failed: ${errorMessage}` });
  }
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`),
);
