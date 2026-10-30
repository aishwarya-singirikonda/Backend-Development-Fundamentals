# Lab 02 – SQLite Database and CRUD Operations

## 1. Aim

To create a SQLite database, store book details, and perform CRUD operations (Create, Read, Update and Delete) using Node.js and Express.js.

## 2. Software and Technologies Used

- Visual Studio Code
- Node.js
- Express.js
- SQLite
- SQLite3
- Postman
- JavaScript

## 3. Procedure

### Step 1: Project Setup

First, I opened Visual Studio Code and created a folder named `lab-02` inside my `Backend-Development-Fundamentals` project.

I opened the terminal and initialized the Node.js project using:

```bash
npm init -y
```

### Step 2: Installing Required Packages

I installed the required packages using the following commands:

```bash
npm install express sqlite sqlite3
```

I also installed Nodemon to restart the server automatically whenever changes were made.

```bash
npm install --save-dev nodemon
```

### Step 3: Creating the SQLite Database

I downloaded the SQLite command-line tools for Windows and verified the installation.

After that, I opened SQLite from the VS Code terminal and created a database named `bookstore.db`.

I created a table named `book` with the following columns:

- id – INTEGER PRIMARY KEY
- title – TEXT
- author – TEXT
- price – INTEGER
- pages – INTEGER

### Step 4: Inserting Book Records

I inserted 10 book records into the `book` table using SQL INSERT statements.

I used the following query to display all the records:

```sql
SELECT * FROM book;
```

I also checked the number of records using:

```sql
SELECT COUNT(*) FROM book;
```

### Step 5: Connecting SQLite with Node.js

I created an `app.js` file and connected the SQLite database with my Express application.

I used the Express framework to create API routes and SQLite methods to perform database operations.

I also used `express.json()` middleware to read JSON data sent through API requests.

### Step 6: Starting the Server

I started the backend server using:

```bash
npm run dev
```

The database connection was successful, and the server started at:

```text
http://localhost:3000/
```

## 4. CRUD Operations

I implemented and tested the following five API endpoints using Postman.

### 1. GET – Retrieve All Books

- HTTP Method: GET
- URL: `http://localhost:3000/books/`
- Purpose: To retrieve all the books stored in the database.
- Response: 200 OK

Screenshot: `screenshots/get-all.png`

### 2. GET – Retrieve a Single Book

- HTTP Method: GET
- URL: `http://localhost:3000/books/1/`
- Purpose: To retrieve the details of a particular book using its ID.
- Response: 200 OK

Screenshot: `screenshots/get-one.png`

### 3. POST – Add a New Book

- HTTP Method: POST
- URL: `http://localhost:3000/books/`
- Purpose: To insert a new book into the database.
- Request Body: JSON format containing title, author, price and pages.
- Response: 201 Created

Screenshot: `screenshots/post.png`

### 4. PUT – Update Book Details

- HTTP Method: PUT
- URL: `http://localhost:3000/books/1/`
- Purpose: To update the details of an existing book.
- Response: 200 OK

Screenshot: `screenshots/put.png`

### 5. DELETE – Delete a Book

- HTTP Method: DELETE
- URL: `http://localhost:3000/books/11/`
- Purpose: To delete a particular book from the database using its ID.
- Response: 200 OK

Screenshot: `screenshots/delete.png`

## 5. Testing and Verification

I tested all the API endpoints using Postman.

The following operations were performed successfully:

1. Retrieved all the books from the database.
2. Retrieved an individual book using its ID.
3. Added a new book using the POST request.
4. Updated the price of an existing book using the PUT request.
5. Deleted the newly added book using the DELETE request.

I also used SQLite queries to check the database records and verify the changes.

## 6. Problems Faced

During the lab setup, I faced a few difficulties:

- Initially, I was unable to access the SQLite command-line tool.
- I downloaded and extracted the SQLite tools for Windows and configured the executable path.
- I faced a small mistake while selecting the HTTP method in Postman, which I corrected by selecting the appropriate method.
- I verified the API responses and database connection after resolving these issues.

## 7. Result

Successfully created the SQLite database `bookstore.db`, created the book table, inserted 10 initial records, and connected the database with Node.js and Express.js.

All five CRUD API operations were implemented and tested successfully using Postman.

## 8. Conclusion

Through this lab, I learned how to create and manage a SQLite database, connect it with a Node.js application, and perform CRUD operations using Express.js.

I also gained practical experience in writing SQL queries, creating REST API endpoints, and testing them using Postman.