package pl.pwr.ztw.restapi_ztw.services;

import pl.pwr.ztw.restapi_ztw.models.Book;
import pl.pwr.ztw.restapi_ztw.models.NotFoundException;

import java.util.Collection;

public interface IRentingService {
    public void rentBook(int readerID, Book book) throws NotFoundException;
    public void returnBook(int readerID, Book book) throws NotFoundException;
    public Collection<Book> checkRentedBooks(int readerID) throws NotFoundException;
}
