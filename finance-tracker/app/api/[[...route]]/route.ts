import { z } from "zod/mini";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { NextRequest, NextResponse } from "next/server";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import authors from "./authors";

export const runtime = "edge";

// initialize a new Hono app, immediately chain the /api route (need this because all of our API routes will be prefixed by /api)
const app = new Hono().basePath('/api')

app.route("/authors", authors)
app.route("/books", authors)

// NOTE - the code below is what the tutorial suggested for simple routes (pre 1:08:00);
// for controllers, we need something like the authors.ts file which we call app.route() on

// .get(
//     "/hello",
//     clerkMiddleware(),
//     (c) => {
//     const auth = getAuth(c);

//     if (!auth?.userId) {
//         return c.json({ error: "Unauthorized"})
//     }

//     return c.json({
//         message: "Hello Next.js!",
//         userId: auth.userId,
//     })
// });

export const GET = handle(app);
// the line above is the same as coding the following in vanilla Next.js:
// export const GET = (request: NextRequest) => {
//     return NextResponse.json({message: "Hello Next.js"})
// }
export const POST  = handle(app);