import React, {useState} from 'react';
import BookForm, {Book} from './BookForm';
import ReactModal from 'react-modal';

const BookList: React.FC<{ 
  onBookSubmit: (book: Book) => void; 
  booksList: Book[]; 
  onEdit: (bookId: number) => void;
}> = ({onBookSubmit,booksList}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [bookToEdit, setBookToEdit] = useState<Book | null>(null);
    
    const handleOpenModal = (theBook : Book) => {
        setIsOpen(true);
        setBookToEdit(theBook);
      };

    const handleBookEdit = (book: Book) => {
      onBookSubmit(book);
    };
    return (
        <div>
         <table>
            <thead>
            <tr>
                <th>Book ID</th>
                <th>Book Name</th>
                <th>Author</th>
                <th>Genre</th>
            </tr>
            </thead>
            <tbody>
            {booksList.map((theBook : Book) => (
                <tr key={theBook.id}>
                <td>{theBook.id}</td>
                <td>{theBook.bookName}</td>
                <td>{theBook.author}</td>
                <td>{theBook.genre}</td>
                <td><button onClick={() => handleOpenModal(theBook)}>Edit</button></td>
                <ReactModal
                    isOpen={isOpen}
                    contentLabel="Example Modal"
                    onRequestClose={() => setIsOpen(false)}
                    
                >
                <h1>Edit Book</h1>
                <BookForm onBookSubmit={handleBookEdit} book={bookToEdit}/>
                </ReactModal>
                <td><button onClick={() => theBook.onDelete()}>&times;</button> {}</td>                
                </tr>
            ))}
        </tbody>
      </table>
        </div>
    )
}


export default BookList;
  