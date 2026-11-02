
const express = require("express");
const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const path = require("path");

const app = express();

app.use(express.json());

const dbPath = path.join(__dirname, "bookstore.db");

let db = null;

// GET all books with search, sorting, pagination and price filtering
app.get("/books/", async (request, response) => {
    try {
        const {
            search_q = "",
            order_by = "title",
            order = "ASC",
            limit = "10",
            offset = "0",
            min_price,
            max_price
        } = request.query;

        // Validate sorting column
        const allowedColumns = ["id", "title", "author", "price", "pages"];

        if (!allowedColumns.includes(order_by)) {
            return response.status(400).send({
                error: "Invalid order_by value"
            });
        }

        // Validate sorting order
        const sortOrder = order.toUpperCase();

        if (!["ASC", "DESC"].includes(sortOrder)) {
            return response.status(400).send({
                error: "Order must be ASC or DESC"
            });
        }

        // Validate pagination
        const pageLimit = Number(limit);
        const pageOffset = Number(offset);

        if (
            !Number.isInteger(pageLimit) ||
            !Number.isInteger(pageOffset) ||
            pageLimit <= 0 ||
            pageOffset < 0
        ) {
            return response.status(400).send({
                error: "Limit must be positive and offset must be non-negative"
            });
        }

        // Validate price filters
        const minPrice = min_price === undefined ? null : Number(min_price);
        const maxPrice = max_price === undefined ? null : Number(max_price);

        if (
            (minPrice !== null && !Number.isFinite(minPrice)) ||
            (maxPrice !== null && !Number.isFinite(maxPrice))
        ) {
            return response.status(400).send({
                error: "Price filters must be numeric"
            });
        }

        if (
            minPrice !== null &&
            maxPrice !== null &&
            minPrice > maxPrice
        ) {
            return response.status(400).send({
                error: "Minimum price cannot exceed maximum price"
            });
        }

        // Build SQL query safely
        let query = "SELECT * FROM book WHERE title LIKE ?";
        const params = [`%${search_q}%`];

        if (minPrice !== null) {
            query += " AND price >= ?";
            params.push(minPrice);
        }

        if (maxPrice !== null) {
            query += " AND price <= ?";
            params.push(maxPrice);
        }

        query += ` ORDER BY ${order_by} ${sortOrder}`;
        query += " LIMIT ? OFFSET ?";

        params.push(pageLimit, pageOffset);

        const books = await db.all(query, params);

        response.status(200).send(books);

    } catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
});


// GET a single book
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
        response.status(500).send({
            error: error.message
        });
    }
});


// POST - Add a new book
app.post("/books/", async (request, response) => {
    try {
        const { title, author, price, pages } = request.body;

        if (
            typeof title !== "string" ||
            !title.trim() ||
            typeof author !== "string" ||
            !author.trim()
        ) {
            return response.status(400).send({
                error: "Title and author are required"
            });
        }

        if (
            price === undefined ||
            price === null ||
            typeof price !== "number" ||
            !Number.isFinite(price)
        ) {
            return response.status(400).send({
                error: "Price must be a valid number"
            });
        }

        if (
            pages !== undefined &&
            (!Number.isInteger(pages) || pages < 0)
        ) {
            return response.status(400).send({
                error: "Pages must be a non-negative integer"
            });
        }

        const result = await db.run(
            `INSERT INTO book (title, author, price, pages)
             VALUES (?, ?, ?, ?)`,
            [title.trim(), author.trim(), price, pages ?? null]
        );

        response.status(201).send({
            message: "Book added successfully",
            bookId: result.lastID
        });

    } catch (error) {
        response.status(500).send({
            error: error.message
        });
    }
});


// PUT - Update a book
app.put("/books/:bookId/", async (request, response) => {
    try {
        const { bookId } = request.params;
        const { title, author, price, pages } = request.body;

        if (
            typeof title !== "string" ||
            !title.trim() ||
            typeof author !== "string" ||
            !author.trim() ||
            typeof price !== "number" ||
            !Number.isFinite(price) ||
            (pages !== undefined &&
                (!Number.isInteger(pages) || pages < 0))
        ) {
            return response.status(400).send({
                error: "Please provide valid title, author, price and pages"
            });
        }

        const result = await db.run(
            `UPDATE book
             SET title = ?, author = ?, price = ?, pages = ?
             WHERE id = ?`,
            [title.trim(), author.trim(), price, pages ?? null, bookId]
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
        response.status(500).send({
            error: error.message
        });
    }
});


// DELETE - Delete a book
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
        response.status(500).send({
            error: error.message
        });
    }
});


// Initialize database and server
const initializeDBAndServer = async () => {
    try {
        db = await sqlite.open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        console.log("Database connected successfully");

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}/`);
        });

    } catch (error) {
        console.log(`Database Error: ${error.message}`);
        process.exit(1);
    }
};

initializeDBAndServer();
