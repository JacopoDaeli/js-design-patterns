// 13 - Flyweight pattern

// From Wikipedia:
// In computer programming, flyweight is a software design pattern.
// A flyweight is an object that minimizes memory usage by sharing as much
// data as possible with other similar objects; it is a way to use objects
// in large numbers when a simple repeated representation would use an
// unacceptable amount of memory. Often some parts of the object state can
// be shared, and it is common practice to hold them in external
// data structures and pass them to the flyweight objects temporarily
// when they are used.
// https://en.wikipedia.org/wiki/Flyweight_pattern

// The following single instance of our book meta-data combinations will
// be shared among all of the copies of a book with a particular title.
class Book {
  constructor (title, author, genre, pageCount, publisherID, ISBN) {
    this.title = title
    this.author = author
    this.genre = genre
    this.pageCount = pageCount
    this.publisherID = publisherID
    this.ISBN = ISBN
  }
}

// Let's now define a very basic factory. What we're going to have it do is
// perform a check to see if a book with a particular title has been
// previously created inside the system; if it has, we'll return it - if not,
// a new book will be created and stored so that it can be accessed later.
// This makes sure that we only create a single copy of each unique
// intrinsic piece of data:
class BookFactory {
  constructor () {
    this._existingBooks = {}
  }
  createBook (title, author, genre, pageCount, publisherID, ISBN) {
    // Find out if a particular book meta-data combination has been created before
    const existingBook = this._existingBooks[ISBN]
    if (existingBook) return existingBook

    // If not, create a new instance of the book, store it and return it
    const book = new Book(title, author, genre, pageCount, publisherID, ISBN)
    this._existingBooks[ISBN] = book
    return book
  }
  static getInstance () {
    if (!BookFactory.instance) {
      BookFactory.instance = new BookFactory()
    }
    return BookFactory.instance
  }
}

// BookFactory static properties
BookFactory.instance = null

// Combinations of a Book object and the library member that's checked them
// out will be called Book records. Our manager will be storing both
// and will also include checkout related logic we stripped out during our
// flyweight optimization of the Book class.
class BookRecordManager {
  constructor () {
    this._bookRecordDatabase = {}
  }

  addBookRecord (id, title, author, genre, pageCount, publisherID, ISBN,
    checkoutDate, checkoutMember, dueReturnDate, availability) {
    const book = BookFactory.getInstace().createBook(title, author, genre,
      pageCount, publisherID, ISBN)

    this._bookRecordDatabase[id] = {
      checkoutMember: checkoutMember,
      checkoutDate: checkoutDate,
      dueReturnDate: dueReturnDate,
      availability: availability,
      book: book
    }
  }

  updateCheckoutStatus (bookID, newStatus, checkoutDate, checkoutMember, newReturnDate) {
    const record = this._bookRecordDatabase[bookID]
    record.availability = newStatus
    record.checkoutDate = checkoutDate
    record.checkoutMember = checkoutMember
    record.dueReturnDate = newReturnDate
  }

  extendCheckoutPeriod (bookID, newReturnDate) {
    this._bookRecordDatabase[bookID].dueReturnDate = newReturnDate
  }

  isPastDue (bookID) {
    const currentDate = new Date().getTime()
    const returnDate = Date.parse(this._bookRecordDatabase[bookID].dueReturnDate)
    return currentDate > returnDate
  }

  static getInstance () {
    if (!BookRecordManager.instance) {
      BookRecordManager.instance = new BookRecordManager()
    }
    return BookRecordManager.instance
  }
}

// BookRecordManager static properties
BookRecordManager.instance = null

// From "Learning JavaScript Design Patterns":
// The result of these changes is that all of the data that's been extracted
// from the Book class is now being stored in an attribute of the
// BookManager singleton (BookDatabase).
// Something considerably more efficient than the large number of objects
// we were previously using. Methods related to book checkouts are also now
// based here as they deal with data that's extrinsic rather than intrinsic.
// This process does add a little complexity to our final solution,
// however it's a small concern when compared to the performance issues
// that have been tackled.
