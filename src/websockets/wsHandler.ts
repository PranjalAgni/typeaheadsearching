import { WebSocketServer, WebSocket } from "ws";
import { SearchData } from "../interfaces";
import searchTrie from "../services/search";

export const setupWebSocket = (wss: WebSocketServer, store: SearchData[]) => {
  wss.on("connection", (ws: WebSocket) => {
    console.log("WebSocket connection established");
    ws.on("message", (message: Buffer) => {
      const query = message.toString().trim();
      if (!query || query.length == 0) return;
      const suggestions = searchTrie.getSuggestions(query.toLowerCase());
      if (suggestions.length) console.log(
        "Suggestions from trie",
        JSON.stringify(suggestions, null, 2)
      );

      const count = suggestions.length;
      if (count == 0) {
        ws.send("No results found");
      } else {
        ws.send(`Starting to share ${count} suggestions`);
        let start = 0;
        setInterval(() => {
          if (start >= count) return;
          ws.send(`Topic: ${suggestions[start]}`);
          start += 1;
        }, 1000);
      }
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed");
    });
  });
};
