import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const distPath = path.join(__dirname, 'dist');

// Check if dist folder exists
if (!existsSync(distPath)) {
  console.error('❌ ERROR: dist folder not found!');
  console.error('Make sure you run "npm run build" before starting the server.');
  console.error('Looking for dist at:', distPath);
  process.exit(1);
}

// Serve static files from the dist directory
app.use(express.static(distPath));

// Handle all routes by serving index.html (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Frontend server running on port ${PORT}`);
  console.log(`📂 Serving from: ${distPath}`);
});
