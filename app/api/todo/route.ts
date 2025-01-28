import db from "@/src/db";
import { todo } from "@/src/db/schema";
import { NextResponse, NextRequest } from "next/server";
import { eq, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
    const todos = await db.select().from(todo).orderBy(desc(todo.createdAt));
    return NextResponse.json(todos);
}

export async function POST(request: NextRequest) {
    const { title, description } = await request.json();
    await db.insert(todo).values({ title, description });
    const [newTodo] = await db.select().from(todo).where(eq(todo.title, title)).orderBy(desc(todo.createdAt)).limit(1);
    return NextResponse.json(newTodo);
}

export async function DELETE(request: NextRequest) {
    const { id } = await request.json();
    await db.delete(todo).where(eq(todo.id, id));
    return NextResponse.json({ message: "Todo deleted" });
}

export async function PUT(request: NextRequest) {
    const { id, title, description } = await request.json();
    await db.update(todo).set({ title, description }).where(eq(todo.id, id));
    return NextResponse.json({ message: "Todo updated" });
}

export async function PATCH(request: NextRequest) {
    const { id, completed } = await request.json();
    await db.update(todo).set({ completed }).where(eq(todo.id, id));
    return NextResponse.json({ message: "Todo updated" });
}

