import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import morgan from "morgan";

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS
app.use(morgan("tiny"));

const PORT = 8000;

// Path to db.json
const DB_PATH = path.join(process.cwd(), "db.json");

// Helper to read DB
function readDB() {
  const data = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(data);
}

// Helper to write DB
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// -----------------------
// ROUTES
// -----------------------

// Health check
app.get("/health", (req, res) => {
  return res.json({ success: true });
});

// Create Todo
app.post("/todos", (req, res) => {
  const db = readDB();
  if (!req.body?.title) {
    return res.status(400).json({ success: false });
  }
  const todo = { id: Date.now(), ...req.body, completed: false };
  db.todos.push(todo);

  writeDB(db);

  return res.json({ success: true, data: { todo: todo } });
});

// Get all todos
app.get("/todos", (req, res) => {
  const db = readDB();
  return res.json({ success: true, data: { todos: db.todos } });
});

// Get single todo
app.get("/todo/:id", (req, res) => {
  const db = readDB();
  const todo = db.todos.find((t) => t.id == req.params.id);

  if (!todo)
    return res.status(404).json({ success: false, msg: "Todo not found" });

  return res.json({ success: true, data: { todo } });
});

// Update todo (PUT)
app.put("/todo/:id", (req, res) => {
  const db = readDB();
  const todoId = Number(req.params.id);
  const index = db.todos.findIndex((t) => t.id === todoId);

  if (index === -1)
    return res.status(404).json({ success: false, msg: "Todo not found" });

  const updatedTodo = { ...db.todos[index], ...req.body, id: todoId };
  db.todos[index] = updatedTodo;

  writeDB(db);

  return res.json({ success: true, data: { todo: updatedTodo } });
});

// Toggle completed (PATCH)
app.patch("/todo/:id/toggle", (req, res) => {
  const db = readDB();
  const todo = db.todos.find((t) => t.id == req.params.id);

  if (!todo)
    return res.status(404).json({ success: false, msg: "Todo not found" });

  todo.completed = !todo.completed;

  writeDB(db);

  return res.json({ success: true, data: { todo } });
});

// Delete todo
app.delete("/todo/:id", (req, res) => {
  const db = readDB();
  const todoId = Number(req.params.id);

  const newTodos = db.todos.filter((t) => t.id !== todoId);

  if (newTodos.length === db.todos.length) {
    return res.status(404).json({ success: false, msg: "Todo not found" });
  }

  db.todos = newTodos;
  writeDB(db);

  return res.json({ success: true });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
