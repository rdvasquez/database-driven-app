import { useEffect, useState } from "react";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Team from "./pages/Team";
// import Contact from "./pages/Contact";
// import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    name: "",
    author: "",
    category: "",
    price: 0,
  });

  useEffect(() => {
    getBooks();
  }, []);

  async function getBooks() {
    // call the api
    const response = await fetch("http://localhost:8080/books");
    // get the data from the response
    const data = await response.json();
    // update our state with that new data
    setBooks(data);
  }

  function handleChange(event) {
    console.log("Input happened");
    const name = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("form submitted");
    console.log(form);

    // make a POST fetch request to the server
    await fetch("http://localhost:8080/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setForm({
      name: "",
      author: "",
      category: "",
      price: 0,
    });

    getBooks();
  }

  return (
    // This content will show on every page
    <div>
      {/* <BrowserRouter>
        <header>
          <h1>“Today a reader, tomorrow a leader.”</h1>
          <h3>-Margaret Fuller</h3>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/team">Team</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer>Copyright VST & Co. 2024</footer>
      </BrowserRouter> */}

      <h2>Add a new Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Book"
          onChange={handleChange}
          value={form.name}
        />
        <input
          name="author"
          placeholder="Author"
          onChange={handleChange}
          value={form.author}
        />
        <input
          name="category"
          placeholder="Category"
          onChange={handleChange}
          value={form.category}
        />
        <input
          name="price"
          placeholder="Price"
          type="number"
          onChange={handleChange}
          value={form.price}
        />
        <button>Submit</button>
      </form>

      <h2>Top Books in Education, Finance, Programming and Self-Improvement</h2>
      {books.map(function (book) {
        return (
          <h3 key={book.name}>
            {book.name} - £{book.price}
          </h3>
        );
      })}
    </div>
  );
}
