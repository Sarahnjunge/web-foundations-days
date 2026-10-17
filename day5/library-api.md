
# Library Books REST API

## Resource Overview

- Resource: Books
- Base path: `/api/books`
- Data format: JSON

Each book has an ID, title, author, publication year, and ISBN.

## 1. List All Books

- **Method:** GET
- **Path:** `/api/books`
- **Description:** Returns all books in the library.
- **Request body:** None.
- **Success status:** `200 OK`

## 2. Get One Book

- **Method:** GET
- **Path:** `/api/books/{id}`
- **Description:** Returns a book with the specified ID.
- **Request body:** None.
- **Success status:** `200 OK`

## 3. Create a Book

- **Method:** POST
- **Path:** `/api/books`
- **Description:** Adds a new book to the library.
- **Example request body:**

```json
{
  "title": "Things Fall Apart",
  "author": "Chinua Achebe",
  "publicationYear": 1958,
  "isbn": "9780385474542"
}
```

- **Success status:** `201 Created`

## 4. Update a Book

- **Method:** PUT
- **Path:** `/api/books/{id}`
- **Description:** Replaces the details of an existing book.
- **Example request body:**

```json
{
  "title": "Things Fall Apart",
  "author": "Chinua Achebe",
  "publicationYear": 1958,
  "isbn": "9780385474542"
}
```

- **Success status:** `200 OK`

## 5. Delete a Book

- **Method:** DELETE
- **Path:** `/api/books/{id}`
- **Description:** Deletes a book with the specified ID.
- **Request body:** None.
- **Success status:** `204 No Content`

## 6. List Books by Author

- **Method:** GET
- **Path:** `/api/books?author=Chinua%20Achebe`
- **Description:** Returns books written by the specified author using a query parameter.
- **Request body:** None.
- **Success status:** `200 OK`

## Error Responses

### 400 Bad Request

- **Description:** The request contains invalid data.
- **Example:** A POST request attempts to create a book without a required title or author.

### 404 Not Found

- **Description:** The requested resource does not exist.
- **Example:** A GET request to `/api/books/9999` requests a book ID that does not exist.
