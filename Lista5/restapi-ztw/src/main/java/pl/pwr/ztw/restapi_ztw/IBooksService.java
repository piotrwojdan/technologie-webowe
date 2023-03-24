package pl.pwr.ztw.restapi_ztw;

import java.util.Collection;
public interface IBooksService {
    public abstract Collection<Book> getBooks();
    public abstract Book getBook(int id);
    public abstract void updateBook(int id, Book newBook) throws NotFoundException;
    public abstract Book deleteBook(int id) throws NotFoundException;
}