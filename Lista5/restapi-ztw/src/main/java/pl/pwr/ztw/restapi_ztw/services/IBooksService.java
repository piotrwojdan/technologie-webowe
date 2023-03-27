package pl.pwr.ztw.restapi_ztw.services;

import pl.pwr.ztw.restapi_ztw.models.Book;
import pl.pwr.ztw.restapi_ztw.models.NotFoundException;

import java.util.Collection;
public interface IBooksService {
    public Collection<Book> getBooks();
    public Book getBook(int id);
    public void createBook(Book newBook);
    public void updateBook(int id, Book newBook) throws NotFoundException;
    public Book deleteBook(int id) throws NotFoundException;
}