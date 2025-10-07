# @echo/middleware — Express Middleware (Open Core)

**License:** Apache-2.0

A minimal Express middleware that annotates every HTTP response with an `x-echo-protocol` header.
Useful for demos and to assert that a service is **Echo Mode aware**.

---

## Install

```bash
pnpm add @echo/middleware express
# or
npm i @echo/middleware express
```

---

## Usage

```ts
import express from "express";
import { echoMiddleware } from "@echo/middleware";

const app = express();
app.use(echoMiddleware());
app.get("/", (_, res) => res.send("ok"));
app.listen(3000);
```

Then:

```bash
curl -i http://localhost:3000
# → response headers include: x-echo-protocol: v1.3
```

> Commercial edition adds richer headers, request IDs, provider annotations, and correlation IDs.
