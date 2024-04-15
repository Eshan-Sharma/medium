import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { postInput } from "../../../common/src/index";
import { updatePostInput } from "../../../common/src/index";
export const blogRouter = new Hono<{
  Bindings: { DATABASE_URL: string; JWT_SECRET: string };
  Variables: { userId: string };
}>();

blogRouter.use("/*", async (c, next) => {
  const authToken = c.req.header("authorization") || "";
  try {
    const user = await verify(authToken, c.env.JWT_SECRET);
    if (user) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({ message: "You are not logged in" });
    }
  } catch (error) {
    c.status(403);
    return c.json({ message: "You are not logged in" });
  }
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
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
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
    const id = c.req.param("id");
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.findFirst({
      where: { id: id },
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
    const success = postInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({ message: "Invalid inputs" });
    }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
      datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const post = await prisma.post.create({
      data: { title: body.title, content: body.content, authorId: authorId },
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
    const success = updatePostInput.safeParse(body);
    if (!success) {
      c.status(411);
      return c.json({ message: "Invalid inputs" });
    }
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
