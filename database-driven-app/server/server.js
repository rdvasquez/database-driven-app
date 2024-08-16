import express, { response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

app.get("/", function (request, response) {
  response.json("rapid response");
});

app.get("/books", async function (request, response) {
  const data = await db.query(`SELECT * FROM books`);
  // response.json("these are my books");
  console.log(data);
});

app.post("/books", async function (request, response) {
  const name = request.body.name;
  const author = request.body.author;
  const category = request.body.category;
  const price = request.body.price;

  await db.query(
    `INSERT INTO books (name, author, category, price) VALUES ($1, $2, $3, $4)`,
    [name, author, category, price]
  );
  response.json("Books POST endpoint");
});

app.listen(8080, () => console.log("Server is running on port 8080"));
