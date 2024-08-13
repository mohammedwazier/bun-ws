import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

const clients = new Set<WebSocket>();

// Prepare a reusable function for broadcasting
const broadcastToClients = (data: any) => {
  const message = JSON.stringify({
    type: "location",
    data,
  });

  clients.forEach((client) => {
    client.send(message);
  });
};

const app = new Elysia()
  .use(cors())
  .ws("/ws", {
    open(ws) {
      console.log("WebSocket connection opened");
      clients.add(<any>ws);
    },
    message(ws, message) {
      console.log(`Received message: ${message}`);
      ws.send(`Echo: ${message}`);
    },
    close(ws) {
      console.log("WebSocket connection closed");
      clients.delete(<any>ws);
    },
  })
  .get("/", (req) => {
    // const recv_server = new Date().toISOString();
    // const updatedQuery = { ...query, recv_server };

    console.log({ req });

    // Use the broadcast function
    // broadcastToClients(updatedQuery);

    return {
      message: "Hello, Elysia!",
    };
  })
  .post("/", ({ body }) => {
    console.log({ body });

    return {
      message: "Hello, Elysia!",
    };
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
