import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const route = Router();
const prisma = new PrismaClient();
// CRUD: Create Read Update Delete.

// Root for todo returns all todos.
route.get("/", async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany({
        orderBy: {
            created_at: "asc",
        },
    });

    return res.status(200).json(todos);
});

// Create new todo.
route.post("/", async (req: Request, res: Response) => {
    let { title } = req.body;
    try {
        const newTodo = await prisma.todo.create({
            data: {
                title,
            },
        });
        return res.status(200).json(newTodo);
    } catch (ex: any) {
        return res.status(500).json({ message: "Something went wrong." });
    }
});

// Read todo.
route.get("/:id", async (req: Request, res: Response) => {
    let { id } = req.params;
    try {
        const todo = await prisma.todo.findFirst({
            where: {
                id: parseInt(id),
            },
        });
        if (todo) return res.status(200).json(todo);
        return res.status(404).json({ message: "Record not found." });
    } catch (ex: any) {
        if (ex.name === "PrismaClientValidationError")
            return res.status(400).json({ message: "Invalid todo Id." });
        return res.status(500).json({ message: ex });
    }
});

// Update todo.
route.patch("/:id", async (req: Request, res: Response) => {
    let { title } = req.body;
    let { id } = req.params;
    try {
        const updatedTodo = await prisma.todo.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title,
            },
        });
        return res.status(200).json(updatedTodo);
    } catch (ex: any) {
        if (ex.code === "P2025")
            return res.status(404).json({ message: ex.meta.cause });
        if (ex.name === "PrismaClientValidationError")
            return res.status(400).json({ message: "Invalid todo Id." });
        return res.status(500).json({ message: ex });
    }
});

// Delete todo.
route.delete("/:id", async (req: Request, res: Response) => {
    let { id } = req.params;
    try {
        const todo = await prisma.todo.delete({
            where: {
                id: parseInt(id),
            },
        });
        return res.status(200).json();
    } catch (ex: any) {
        if (ex.code === "P2025")
            return res.status(500).json({ message: ex.meta.cause });
        if (ex.name === "PrismaClientValidationError")
            return res.status(400).json({ message: "Invalid todo Id." });
        return res.status(500).json({ message: ex });
    }
});

// Toggle Status.
route.get("/:id/toggle-status", async (req: Request, res: Response) => {
    let { id } = req.params;
    try {
        const todo = await prisma.todo.findFirst({
            where: { id: parseInt(id) },
        });
        if (!todo)
            return res.status(404).json({ message: "Record not found." });
        const updatedTodo = await prisma.todo.update({
            where: {
                id: parseInt(id),
            },
            data: {
                status: todo.status === "PENDING" ? "COMPLETE" : "PENDING",
            },
        });
        return res.status(200).json(updatedTodo);
    } catch (ex: any) {
        return res.status(500).json({ message: ex });
    }
});

export default route;
