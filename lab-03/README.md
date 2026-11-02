# Lab 03 – Bookstore REST API

## About This Lab

In this lab, I worked on building a REST API using Node.js, Express.js and SQLite. The main aim was to understand how a backend application works and how we can perform different operations on a database through API requests.

I used a Bookstore database to store book details like title, author, price and number of pages. I also tested the API using Postman to check whether all the operations were working correctly.

## Technologies Used

- Node.js
- Express.js
- SQLite
- JavaScript
- Postman
- Nodemon

## Features Implemented

In this lab, I implemented the following features:

1. **Get All Books:** Displays all the books available in the database.
2. **Get Book by ID:** Fetches the details of a particular book using its ID.
3. **Add a Book:** Adds a new book to the database using a POST request.
4. **Update a Book:** Updates the existing book details using a PUT request.
5. **Delete a Book:** Deletes a book from the database using its ID.
6. **Search Books:** Searches for books using their titles.
7. **Sorting:** Sorts books based on fields like title, author and price in ascending or descending order.
8. **Pagination:** Displays a limited number of books using limit and offset.
9. **Price Filtering:** Filters books based on minimum and maximum price.

## Validation and Error Handling

I also added validations to make sure that incorrect data is not accepted by the API.

Some of the validations I tested include:

- Checking whether title and author are provided.
- Checking whether the price is a valid number.
- Checking whether pages is a non-negative integer.
- Checking whether the sorting order is ASC or DESC.
- Checking whether the limit and offset values are valid.
- Checking whether minimum price is greater than maximum price.
- Returning a 404 error when a requested book is not found.

## Installation and Running the Project

First, install the required packages:

```bash
npm install
```

To start the server using nodemon, run:

```bash
npm run dev
```

The server runs at:

```text
http://localhost:3000/
```

## API Testing

I used Postman to test the different API requests.

Some of the requests I tested were:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/books/` | Get all books |
| GET | `/books/1/` | Get a book by ID |
| POST | `/books/` | Add a new book |
| PUT | `/books/1/` | Update a book |
| DELETE | `/books/1/` | Delete a book |

I also tested query parameters for searching, sorting, pagination and filtering books based on price.

## Screenshots

I have added screenshots of my API testing in the `screenshots` folder. They show the successful requests as well as some invalid inputs that I tested to check the validation and error-handling functionality.

## What I Learned

While doing this lab, I understood how to connect a Node.js application with an SQLite database and perform CRUD operations through REST APIs.

I also got practical experience with query parameters, SQL queries, input validation and error handling. Testing different requests in Postman helped me understand how the backend responds to both valid and invalid inputs.

Overall, this lab helped me get a better understanding of backend development and how APIs communicate with databases.