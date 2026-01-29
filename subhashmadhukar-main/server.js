import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { handler as chatHandler } from "./api/chat.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 8080;

async function createServer() {
  const app = express();
  
  // CORS headers
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });
  
  app.use(express.json());

  // API Routes - must be before Vite middleware
  app.post("/api/chat", async (req, res) => {
    try {
      await chatHandler(req, res);
    } catch (error) {
      console.error("API Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  if (!isProduction) {
    // Development: Use Vite dev server
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production: Serve static files
    app.use(express.static(resolve(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

createServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
