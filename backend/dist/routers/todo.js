"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const route = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// CRUD: Create Read Update Delete.
// Root for todo returns all todos.
route.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todos = yield prisma.todo.findMany({
        orderBy: {
            created_at: "asc",
        },
    });
    return res.status(200).json(todos);
}));
// Create new todo.
route.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { title } = req.body;
    try {
        const newTodo = yield prisma.todo.create({
            data: {
                title,
            },
        });
        return res.status(200).json(newTodo);
    }
    catch (ex) {
        return res.status(500).json({ message: "Something went wrong." });
    }
}));
// Read todo.
route.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    try {
        const todo = yield prisma.todo.findFirst({
            where: {
                id: parseInt(id),
            },
        });
        if (todo)
            return res.status(200).json(todo);
        return res.status(404).json({ message: "Record not found." });
    }
    catch (ex) {
        if (ex.name === "PrismaClientValidationError")
            return res.status(400).json({ message: "Invalid todo Id." });
        return res.status(500).json({ message: ex });
    }
}));
// Update todo.
route.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { title } = req.body;
    let { id } = req.params;
    try {
        const updatedTodo = yield prisma.todo.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title,
            },
        });
        return res.status(200).json(updatedTodo);
    }
    catch (ex) {
        if (ex.code === "P2025")
            return res.status(404).json({ message: ex.meta.cause });
        if (ex.name === "PrismaClientValidationError")
            return res.status(400).json({ message: "Invalid todo Id." });
        return res.status(500).json({ message: ex });
    }
}));
// Delete todo.
route.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    try {
        const todo = yield prisma.todo.delete({
            where: {
                id: parseInt(id),
            },
        });
        return res.status(200).json();
    }
    catch (ex) {
        if (ex.code === "P2025")
            return res.status(500).json({ message: ex.meta.cause });
        if (ex.name === "PrismaClientValidationError")
            return res.status(400).json({ message: "Invalid todo Id." });
        return res.status(500).json({ message: ex });
    }
}));
// Toggle Status.
route.get("/:id/toggle-status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    try {
        const todo = yield prisma.todo.findFirst({
            where: { id: parseInt(id) },
        });
        if (!todo)
            return res.status(404).json({ message: "Record not found." });
        const updatedTodo = yield prisma.todo.update({
            where: {
                id: parseInt(id),
            },
            data: {
                status: todo.status === "PENDING" ? "COMPLETE" : "PENDING",
            },
        });
        return res.status(200).json(updatedTodo);
    }
    catch (ex) {
        return res.status(500).json({ message: ex });
    }
}));
exports.default = route;
