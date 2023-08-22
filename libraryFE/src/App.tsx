import React, {useState} from 'react';
import ReactModal from 'react-modal';
import Header from './Header';
import BookForm, {Book} from './BookForm';
import BookList from './BookList';
import ReactDOM from 'react-dom/client';



const App: React.FC = () => {
  const [booksList, setBooks] = useState<Book[]>([]);
  const [bookToEdit, setBookToEdit] = useState<Book | null>(null);

  const handleBookSubmit = (book: Book) => {
    const existingBookIndex = booksList.findIndex(existingBook => existingBook.id === book.id);
    if (existingBookIndex !== -1) {
      const updatedBooks = [...booksList];
      updatedBooks[existingBookIndex] = book;
      setBooks(updatedBooks);
    } else {
      setBooks(prevBooks => [...prevBooks, book]);
    }
  };
  const handleBookDelete = (bookId: number) => {
    setBooks(prevBooks => prevBooks.filter((book) => book.id !== bookId));
  };
  const handleBookEdit = (bookId: number) => {
    const book = booksList.find((book) => book.id === bookId);
    if (book) {
      setBookToEdit(book);
    }
  };

  const bookList = booksList.map((book) => ({
    ...book,
    onDelete: () => handleBookDelete(book.id),
    onEdit: () => handleBookEdit(book.id)
  }));

  return (
    <div>
      <Header />
      <BookForm onBookSubmit={handleBookSubmit} book={bookToEdit}/>
      <BookList onBookSubmit={handleBookSubmit} booksList = {bookList}  onEdit={handleBookEdit}/>     
    </div>
  );
}

export default App;
