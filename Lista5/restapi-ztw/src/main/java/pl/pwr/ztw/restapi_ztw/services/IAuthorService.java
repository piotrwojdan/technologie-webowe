package pl.pwr.ztw.restapi_ztw.services;

import pl.pwr.ztw.restapi_ztw.models.Author;
import pl.pwr.ztw.restapi_ztw.models.Book;
import pl.pwr.ztw.restapi_ztw.models.NotFoundException;
import pl.pwr.ztw.restapi_ztw.models.PermissionDeniedException;

import java.util.Collection;

public interface IAuthorService {

    public Collection<Author> getAuthors();
    public Author getAuthor(int id);
    public void createAuthor(Author newAuthor);
    public void updateAuthor(int id, Author newAuthor) throws NotFoundException;
    public Author deleteAuthor(int id) throws NotFoundException, PermissionDeniedException;
    public void addBook(int id, Book book);
    public void removeBook(Book book);
}
