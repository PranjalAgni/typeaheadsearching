import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { setupWebSocket } from "./websockets/wsHandler";
import { scrapeData } from "./services/dataScraper";
import searchTrie from "./services/search";

export const initalizeServer = async () => {
  const app = express();

  // Scrape the data
  const store = await scrapeData();

  // fill up the trie
  store.forEach((data) => {
    searchTrie.insert(data.name.toLowerCase());
  });

  // Create HTTP server
  const server = http.createServer(app);

  // Create WebSocket server
  const wss = new WebSocketServer({ server });

  setupWebSocket(wss, store);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  return server;
};
