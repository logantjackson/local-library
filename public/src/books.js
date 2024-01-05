function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const checkedOutBooks = [];
  const returnedBooks = [];

  books.forEach(book => {
    const isBookCheckedOut = book.borrows.length > 0 ? !book.borrows[0].returned : true;

    isBookCheckedOut ? checkedOutBooks.push(book) : returnedBooks.push(book);
  });

  return [checkedOutBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  const borrowers = book.borrows.map((borrow) => {
    const account = accounts.find((result) => result.id === borrow.id);
    return { ...account, returned: borrow.returned };
  });

  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
