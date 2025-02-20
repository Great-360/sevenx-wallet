import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { drizzle } from 'drizzle-orm/neon-http';
import { sql } from 'drizzle-orm';
import { neon } from "@neondatabase/serverless";
import { todo, user } from "../src/db/schema"; // Adjust path
import { eq } from "drizzle-orm";

const connection = neon("postgresql://neondb_owner:npg_ptEH1I7YJgyw@ep-dark-cell-a8nu8kl7-pooler.eastus2.azure.neon.tech/neondb?sslmode=require");
const db = drizzle(connection);
beforeAll(async () => {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS todo (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT FALSE,
      "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
    )
  `);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "user" (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email TEXT NOT NULL,
      password TEXT NOT NULL
    )
  `);
});

afterAll(async () => {
  await db.execute(sql`DROP TABLE todo`);
  await db.execute(sql`DROP TABLE "user"`);
});

describe("Todo Table", () => {
  it("should insert and retrieve a todo item", async () => {
    const newTodo = await db.insert(todo).values({
      title: "Test Todo",
      description: "This is a test todo.",
    }).returning();

    expect(newTodo[0]).toHaveProperty("id");
    expect(newTodo[0].title).toBe("Test Todo");
    expect(newTodo[0].completed).toBe(false);
  });
});

describe("User Table", () => {
  it("should insert and retrieve a user", async () => {
    const newUser = await db.insert(user).values({
      email: "test@example.com",
      password: "hashedpassword"
    }).returning();

    expect(newUser[0]).toHaveProperty("id");
    expect(newUser[0].email).toBe("test@example.com");
  });
});