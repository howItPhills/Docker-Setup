import express, {
  type Application,
  type Request,
  type Response,
} from "express";

const app: Application = express();
app.use(express.json());

const items: { id: number; name: string; price: number }[] = [
  { id: 1, name: "Item 1", price: 10 },
  { id: 2, name: "Item 2", price: 20 },
  { id: 3, name: "Item 3", price: 30 },
];

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome, friend!!");
});

// Create
app.post("/items", (req: Request, res: Response) => {
  const item = req.body;
  items.push(item);
  res.status(201).json(item);
});

// Read all
app.get("/items", (req: Request, res: Response) => {
  res.json(items);
});

// Read one
app.get("/items/:id", (req: Request<{ id: string }>, res: Response) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) {
    res.status(404).json({ message: "Item not found" });
    return;
  }
  res.json(item);
});

// Update
app.put("/items/:id", (req: Request<{ id: string }>, res: Response) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) {
    res.status(404).json({ message: "Item not found" });
    return;
  }
  Object.assign(item, req.body);
  res.json(item);
});

// Delete
app.delete("/items/:id", (req: Request<{ id: string }>, res: Response) => {
  const index = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (index === -1) {
    res.status(404).json({ message: "Item not found" });
    return;
  }
  const deletedItem = items.splice(index, 1);
  res.json(deletedItem);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
