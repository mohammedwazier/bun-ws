import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .get("/", ({ body, query, path, params }) => {
    // console.log({ body, query, path, params });`
    const recv_server: any = new Date();
    query = {
      ...query,
      recv_server,
    };
    console.log({ query });
    return {
      message: "Hello, Elysia!",
    };
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
