const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
let books = [
  { id: 1, title: 'Atomic Habits', author: 'James' },
  { id: 2, title: 'Deep Work', author: 'Cal Newport' },
  { id: 3, title: 'The Alchemist', author: 'Paulo Coelho' },
  { id: 4, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki' },
  { id: 5, title: 'Think and Grow Rich', author: 'Napoleon Hill' },
  { id: 6, title: 'The Power of Now', author: 'Eckhart Tolle' },
  { id: 7, title: 'Start With Why', author: 'Simon Sinek' },
  { id: 8, title: 'The 7 Habits of Highly Effective People', author: 'Stephen Covey' },
  { id: 9, title: 'Zero to One', author: 'Peter Thiel' },
  { id: 10, title: 'The Lean Startup', author: 'Eric Ries' },
  { id: 11, title: 'Grit', author: 'Angela Duckworth' },
  { id: 12, title: 'Mindset', author: 'Carol Dweck' },
  { id: 13, title: 'The Subtle Art of Not Giving a F*ck', author: 'Mark Manson' },
  ];

  app.get("/books", (req,res)=> {
    res.json(books);
  });

   app.get("/books/search", (req, res) => {
  // DEBUG sax ah
  console.log("Query:", req.query);

  const { author } = req.query;

  // haddii query la waayo
  if (!author) {
    return res.status(400).json({
      message: "author query is required"
    });
  }

  // filter books
  const result = books.filter(book =>
    book.author.toLowerCase().includes(author.trim().toLowerCase())
  );

  console.log("Result:", result);

  // haddii wax la waayo
  if (result.length === 0) {
    return res.status(404).json({
      message: "books not found"
    });
  }

  res.json(result);
});
  app.post("/books", (req,res)=> {
    // const booksData = req.body;
    const {title, author} = req.body;
    if (!title || !author) {
    return res.status(400).json({
      message: "title and author are required"
    });
  }
    const newBooks = {
        id: books.length + 1,
        title: title,
        author: author
    }

    books.push(newBooks);

   res.status(201).json(newBooks);
  })

  app.get("/books/:id", (req,res)=> {
    const book = books.find(book => book.id == req.params.id);
    if(!book) {
        return res.status(404).send("books are not found");
    }
    res.json(book);
  })

  app.put("/books/:id",(req,res)=> {
    const book = books.find(book => book.id == req.params.id);
      if(!book) {
        return res.status(404).send("books are not found");
    }
    book.title = req.body.title;
    book.author = req.body.author;
    res.json(book);
  })

  app.delete("/books/:id",(req,res)=> {
    books = books.filter(book => book.id != req.params.id);
    res.send('books deleted successfully');
  })

 
app.listen(port, ()=> {
    console.log(`server is running on http://localhost:${port}`);
})