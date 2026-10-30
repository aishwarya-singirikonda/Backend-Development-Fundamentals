
const express = require("express");
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const path = require("path");

const app = express();

app.use(express.json());

const dbPath = path.join(__dirname, "bookstore.db");

let db = null;

app.get("/books/", async (request, response) => {
    try {
        const books = await db.all("SELECT * FROM book");
        response.status(200).send(books);
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
});

app.get("/books/:bookId/", async (request, response) => {
    try {
        const { bookId } = request.params;

        const book = await db.get(
            "SELECT * FROM book WHERE id = ?",
            [bookId]
        );

        if (!book) {
            return response.status(404).send({
                error: "Book not found"
            });
        }

        response.status(200).send(book);
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
});


app.post("/books/", async (request, response) => {
    try {
        const { title, author, price, pages } = request.body;

        if (
            !title ||
            !author ||
            price === undefined ||
            pages === undefined
        ) {
            return response.status(400).send({
                error: "Please provide all book details"
            });
        }

        const result = await db.run(
            `INSERT INTO book (title, author, price, pages)
             VALUES (?, ?, ?, ?)`,
            [title, author, price, pages]
        );

        response.status(201).send({
            message: "Book added successfully",
            bookId: result.lastID
        });
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
});


app.put("/books/:bookId/", async (request, response) => {
    try {
        const { bookId } = request.params;
        const { title, author, price, pages } = request.body;

        if (
            !title ||
            !author ||
            price === undefined ||
            pages === undefined
        ) {
            return response.status(400).send({
                error: "Please provide all book details"
            });
        }

        const result = await db.run(
            `UPDATE book
             SET title = ?, author = ?, price = ?, pages = ?
             WHERE id = ?`,
            [title, author, price, pages, bookId]
        );

        if (result.changes === 0) {
            return response.status(404).send({
                error: "Book not found"
            });
        }

        response.status(200).send({
            message: "Book updated successfully"
        });
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
});


app.delete("/books/:bookId/", async (request, response) => {
    try {
        const { bookId } = request.params;

        const result = await db.run(
            "DELETE FROM book WHERE id = ?",
            [bookId]
        );

        if (result.changes === 0) {
            return response.status(404).send({
                error: "Book not found"
            });
        }

        response.status(200).send({
            message: "Book deleted successfully"
        });
    } catch (error) {
        response.status(500).send({ error: error.message });
    }
});


const initializeDBAndServer = async () => {
    try {
        db = await sqlite.open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        console.log("Database connected successfully");

        app.listen(3000, () => {
            console.log("Server running at http://localhost:3000/");
        });

    } catch (error) {
        console.log(`Database Error: ${error.message}`);
        process.exit(1);
    }
};

initializeDBAndServer();
