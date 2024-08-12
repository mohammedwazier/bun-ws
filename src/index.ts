import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

const clients = new Set<WebSocket>();

const app = new Elysia()
  .use(cors())
  .ws("/ws", {
    open(ws: any) {
      console.log("WebSocket connection opened");
      clients.add(ws);
    },
    message(ws, message) {
      console.log(`Received message: ${message}`);
      ws.send(`Echo: ${message}`);
    },
    close(ws: any) {
      console.log("WebSocket connection closed");
      clients.delete(ws);
    },
  })
  .get("/", ({ body, query, path, params }) => {
    // console.log({ body, query, path, params });`
    const recv_server: any = new Date();
    query = {
      ...query,
      recv_server,
    };
    // console.log({ query });

    for (const client of clients) {
      client.send(
        JSON.stringify({
          type: "location",
          data: query,
        })
      );
    }
    return {
      message: "Hello, Elysia!",
    };
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
