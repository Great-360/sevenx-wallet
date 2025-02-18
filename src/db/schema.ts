import { pgTable, text, integer, boolean, PgTable, timestamp, uuid } from "drizzle-orm/pg-core";

export const todo = pgTable("todo", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    completed: boolean("completed").notNull().default(false),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const user = pgTable("user", {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull(),
    password: text("password").notNull(),
});
