import { describe, it, expect, vi } from "vitest";
import { GET, POST, DELETE, PUT, PATCH } from "../app/api/todo/route"; // Adjust path
import db from "@/src/db";
import { todo } from "@/src/db/schema";
import { NextRequest } from "next/server";



describe("Todo API", () => {
  it("should retrieve todos on GET", async () => {
    vi.spyOn(db, "select").mockReturnValue({
        from: () => ({
            orderBy: () => ({
                execute: () =>
                    Promise.resolve([
                        { id: "1", title: "Test", description: "Test Desc", createdAt: new Date() },
                    ]),
            }),
        }),
    } as any);

    const response = await GET(new NextRequest("http://localhost:3000"));
    const data = await response.json();
    expect(data).toEqual([{ id: "1", title: "Test", description: "Test Desc", createdAt: expect.any(Date) }]);
});

  it("should create a todo on POST", async () => {
    vi.spyOn(db, "insert").mockReturnValue({
        values: () => ({
          returning: () => ({
            execute: () =>
              Promise.resolve([
                { id: "1", title: "New Todo", description: "New Desc", createdAt: new Date() },
              ]),
          }),
        }),
      } as any);
      
      vi.spyOn(db, "select").mockReturnValue({
        from: () => ({
          orderBy: () => ({
            execute: () =>
              Promise.resolve([
                { id: "1", title: "Test", description: "Test Desc", createdAt: new Date() },
              ]),
          }),
        }),
      } as any);
    const response = await POST(new NextRequest("http://localhost:3000", { body: JSON.stringify({ title: "New Todo", description: "New Desc" }) }));
    const data = await response.json();
    expect(data).toBeEqual({ id: "1", title: "New Todo", description: "New Desc", createdAt: new Date() });
  });

  it("should delete a todo on DELETE", async () => {
    vi.spyOn(db, "select").mockReturnValue({
        from: () => ({
          orderBy: () => ({
            execute: async () => ({
              fields: [], // Mock fields metadata
              command: "SELECT",
              rowCount: 1,
              rowAsArray: false,
              rows: [
                { id: "1", title: "Test Todo", description: "Test Desc", createdAt: new Date() },
              ],
            }),
          }),
        }),
      } as any);
      
      vi.spyOn(db, "insert").mockReturnValue({
        values: () => ({
          returning: () => ({
            execute: async () => ({
              fields: [], // Mock fields metadata
              command: "INSERT",
              rowCount: 1,
              rowAsArray: false,
              rows: [
                { id: "1", title: "New Todo", description: "New Desc", createdAt: new Date() },
              ],
            }),
          }),
        }),
      } as any);
      
    const response = await DELETE(new NextRequest("http://localhost:3000", { body: JSON.stringify({ id: "1" }) }));
    const data = await response.json();
    expect(data.message).toBe("Todo deleted");
  });

  it("should update a todo on PUT", async () => {
    vi.spyOn(db, "update").mockReturnValue({
        set: () => ({
            where: () => ({
                returning: () => ({
                    execute: () => Promise.resolve([{ id: "1", title: "Updated", description: "Updated Desc", createdAt: new Date() }]),
                }),
            }),
        }),
    } as any);
    const response = await PUT(new NextRequest("http://localhost:3000", { body: JSON.stringify({ id: "1", title: "Updated", description: "Updated Desc" }) }));
    const data = await response.json();
    expect(data.message).toBe("Todo updated");
  });

  it("should update completion status on PATCH", async () => {
    vi.spyOn(db, "update").mockReturnValue({
        set: () => ({
            where: () => ({
                returning: () => ({
                    execute: () => Promise.resolve([{ id: "1", completed: true }]),
                }),
            }),
        }),
    } as any);
    const response = await PATCH(new  NextRequest("http://localhost:3000", 
    { body: JSON.stringify({ id: "1", completed: true }) }));
    const data = await response.json();
    expect(data.message).toBe("Todo updated");
  });
});
