import React, {useState, useEffect} from "react";

interface BookFormProps {
    onBookSubmit: (book: Book) => void;
    book: Book | null; // Add the book prop
}

export interface Book {
    id: number;
    bookName: string;
    author: string;
    genre : string;
    onDelete: () => void;
    onEdit: () => void;
}
const BookForm: React.FC<BookFormProps> = ({onBookSubmit, book}) => {
    const [bookName, setBookName] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [currentId, setCurrentId] = useState(0);
    const [latestId, setLatestId] = useState(0);

    useEffect(() => {
        if (book) {
          setCurrentId(book.id);
          setBookName(book.bookName);
          setAuthor(book.author);
          setGenre(book.genre);
        }
      }, [book]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      
      event.preventDefault();
      let bookId = 0;
      if(currentId != 0){
        bookId = currentId;
      } else {
        bookId = latestId +1;
        setLatestId(bookId);
      }
      const newBook: Book = {
        id: bookId,
        bookName,
        author,
        genre,
        onDelete() { },
        onEdit() { }
      }
      
      onBookSubmit(newBook);     
      setBookName('');
      setAuthor('');
      setGenre('');
      setCurrentId(0);
    };

    const genres = ['Fiction', 'Literary Fiction', 'Historical Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Romance', 'Thriller', 'Horror', 'Non-fiction', 'Biography', 'Autobiography', 'Memoir', 'History', 'Science', 'Self-help', 'Travel', 'Cookbooks', 'Children\'s literature', 'Poetry', 'Drama', 'Graphic novels', 'Satire', 'Adventure', 'Historical', 'Western', 'Crime', 'Psychological thriller'];

    return(
    <form onSubmit={handleSubmit}>
        <label htmlFor="bookName">Book Name:</label>
        <input type="text" id="bookName" name="bookName" value={bookName} onChange={e => setBookName(e.target.value)}required/>
        <label htmlFor="author">Author:</label>
        <input type="text" id="author" name="author"  value={author} onChange={e => setAuthor(e.target.value)} required/>
        <label htmlFor="genre">Genre:</label>
        <select id="genre" name="genre" value={genre} onChange={e => setGenre(e.target.value)} required>
            <option value="">Select a genre</option>
            {genres.map((genre) => (
                <option key={genre} value={genre}>{genre}</option>
            ))}
        </select>
        <input type="submit" value="Submit"/>
        
    </form> 
    );
}

export default BookForm;