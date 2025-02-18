import dotenv from 'dotenv';
import { NextRequest } from 'next/server';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import db from '@/src/db';
import { GET, POST, DELETE, PUT, PATCH } from '@/app/api/todo/route';

dotenv.config();

// Mock database module
vi.mock('@/src/db', () => ({
  default: {
    select: vi.fn(),
    insert: vi.fn(),
    delete: vi.fn(),
    update: vi.fn(),
  },
}));

describe('Todo API Routes', () => {
  const mockTodo = {
    id: 'test-todo-id',
    title: 'Test Todo',
    description: 'Test Description',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/todos', () => {
    it('should return a list of todos', async () => {
      (db.select as any).mockReturnValue({
        from: vi.fn().mockReturnValue({
          orderBy: vi.fn().mockResolvedValue([mockTodo]),
        }),
      });

      const req = new NextRequest('http://localhost/api/todos');
      const res = await GET(req);

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual([
        {
          ...mockTodo,
          createdAt: mockTodo.createdAt.toISOString(),
          updatedAt: mockTodo.updatedAt.toISOString(),
        },
      ]);
    });
  });
  describe('POST /api/todos', () => {
    it('should create a new todo', async () => {
      const mockTodo = {
        id: 'test-todo-id',
        title: 'Test Todo',
        description: 'Test Description',
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      (db.insert as any).mockReturnValue({
        values: vi.fn().mockResolvedValue([mockTodo]),
      });
  
      (db.select as any).mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            orderBy: vi.fn().mockReturnValue({
              limit: vi.fn().mockResolvedValue([mockTodo]),
            }),
          }),
        }),
      });
  
      const req = new NextRequest('http://localhost/api/todos', {
        method: 'POST',
        body: JSON.stringify({
          title: mockTodo.title,
          description: mockTodo.description,
        }),
      });
  
      const res = await POST(req);
  
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({
        ...mockTodo,
        createdAt: mockTodo.createdAt.toISOString(),
        updatedAt: mockTodo.updatedAt.toISOString(),
      });
    });
  }); 

  describe('DELETE /api/todos', () => {
    it('should delete a todo', async () => {
      (db.delete as any).mockReturnValue({
        where: vi.fn().mockResolvedValue({}),
      });

      const req = new NextRequest('http://localhost/api/todos', {
        method: 'DELETE',
        body: JSON.stringify({ id: 'test-todo-id' }),
      });

      const res = await DELETE(req);

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ message: 'Todo deleted' });
    });
  });

  describe('PUT /api/todos', () => {
    it('should update a todo', async () => {
      (db.update as any).mockReturnValue({
        set: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue({}),
        }),
      });

      const req = new NextRequest('http://localhost/api/todos', {
        method: 'PUT',
        body: JSON.stringify({
          id: 'test-todo-id',
          title: 'Updated Todo',
          description: 'Updated Description',
        }),
      });

      const res = await PUT(req);

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ message: 'Todo updated' });
    });
  });

  describe('PATCH /api/todos', () => {
    it('should update a todo completion status', async () => {
      (db.update as any).mockReturnValue({
        set: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue({}),
        }),
      });

      const req = new NextRequest('http://localhost/api/todos', {
        method: 'PATCH',
        body: JSON.stringify({
          id: 'test-todo-id',
          completed: true,
        }),
      });

      const res = await PATCH(req);

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ message: 'Todo updated' });
    });
  });
});
