function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((count, book) => {
    const [firstBorrow] = book.borrows;
    if (firstBorrow && !firstBorrow.returned) {
      count++;
    }
    return count;
  }, 0);
}

function getMostCommonGenres(books) {
  const genreCount = {};
  books.forEach(book => {
    const genre = book.genre;
      genreCount[genre] = (genreCount[genre] || 0) +1;
  });
  const genreArray = Object.keys(genreCount).map(genre =>({
    name: genre,
    count: genreCount[genre],
  }));
  genreArray.sort((a, b) => b.count - a.count);
  return genreArray.slice(0, 5);
}

function getMostPopularBooks(books) {
 const borrowCounts = books.map(book => ({
   name: book.title,
   count: book.borrows.length
 }));
  borrowCounts.sort((a, b) => b.count - a.count);
  return borrowCounts.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorBorrowCount = {};
  books.forEach((book) => {
    const authorId = book.authorId;
    const author = authors.find((author) => author.id === authorId);

    if (author) {
      const authorName = `${author.name.first} ${author.name.last}`;
      const borrowCount = book.borrows.filter((borrow) => borrow.id).length;
      if (authorBorrowCount[authorName]) {
        authorBorrowCount[authorName] += borrowCount;
      } else {
        authorBorrowCount[authorName] = borrowCount;
      }
    }
  });
  const popularAuthors = Object.entries(authorBorrowCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  return popularAuthors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
