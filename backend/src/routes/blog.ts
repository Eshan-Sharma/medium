import { Hono } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
export const blogRouter = new Hono<{
  Bindings: { DATABASE_URL: string; JWT_SECRET: string };
}>();

blogRouter.use("/*", (c, next) => {
  next();
});

blogRouter.get("/bulk", async (c) => {
  try {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        authorId: true,
      },
    });
    c.status(200);
    return c.json({ posts });
  } catch (error) {
    c.status(411);
    return c.json({ message: "Error while fetching data" });
  }
});

blogRouter.get("/:id", async (c) => {
  try {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.findFirst({
      where: { id: body.id },
    });
    return c.json({ post });
  } catch (error) {
    c.status(411);
    return c.json({ message: "Error while fetching" });
  }
});

blogRouter.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.create({
      data: { title: body.title, content: body.content, authorId: "" },
    });
    c.status(200);
    return c.json({ id: post.id });
  } catch (error) {
    c.status(411);
    return c.json({ message: "Post failed" });
  }
});

blogRouter.put("/", async (c) => {
  try {
    const body = await c.req.json();
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.update({
      where: { id: body.id },
      data: { title: body.title, content: body.content },
    });
    c.status(200);
    return c.json({ id: post.id });
  } catch (error) {
    c.status(411);
    return c.json({ message: "Post Update failed" });
  }
});
