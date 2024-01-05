function findAccountById(accounts, id) {
  return accounts.find(account => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => {
    const lastA = a.name.last.toLowerCase();
    const lastB = b.name.last.toLowerCase();
    
     return lastA < lastB ? -1 : (lastA > lastB ? 1 : 0);
  });
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  const totalBorrows = books.reduce((result, book) => {
    const borrowsForAccount = book.borrows.filter(borrow => borrow.id === accountId);
    return result + borrowsForAccount.length;
  }, 0);

  return totalBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  const possessedBooks = books.filter(book => {
    const recentBorrow = book.borrows[0];
    return recentBorrow.id === accountId && !recentBorrow.returned;
  });
  const booksWithAuthors = possessedBooks.map(book => {
    const author = authors.find(author => author.id === book.authorId);
    return { ...book, author };
  });

  return booksWithAuthors;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
