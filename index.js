import { serve } from "bun";

const server = serve({
  port: 3000,
  fetch(req, server) {
    // Upgrade the request to a WebSocket connection
    if (server.upgrade(req)) {
      return; // Return if upgrade is successful
    }
    return new Response("Upgrade failed", { status: 500 });
  },
  websocket: {
    open(ws) {
      console.log("New client connected");
    },
    message(ws, message) {
      console.log("Received data from Traccar:", message);
      // Process the data here
    },
    close(ws, code, reason) {
      console.log("Client disconnected");
    },
  },
});

console.log(`WebSocket server is running on port ${server.port}`);
