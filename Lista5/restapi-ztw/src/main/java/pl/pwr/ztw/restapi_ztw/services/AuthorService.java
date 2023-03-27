package pl.pwr.ztw.restapi_ztw.services;

import org.springframework.stereotype.Service;
import pl.pwr.ztw.restapi_ztw.models.Author;
import pl.pwr.ztw.restapi_ztw.models.Book;
import pl.pwr.ztw.restapi_ztw.models.NotFoundException;
import pl.pwr.ztw.restapi_ztw.models.PermissionDeniedException;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class AuthorService implements IAuthorService{

    private static List<Author> authorsRepo = new ArrayList<>();
    static {
        BooksService booksService = new BooksService();
        authorsRepo.add(new Author(1,"Henryk", "Sienkiewicz"));
        authorsRepo.get(0).addBook(booksService.getBook(0));
        authorsRepo.add(new Author(2,"Stanisław", "Reymont"));
        authorsRepo.get(1).addBook(booksService.getBook(1));
        authorsRepo.add(new Author(3,"Adam", "Mickiewicz"));
        authorsRepo.get(2).addBook(booksService.getBook(2));
    }

    @Override
    public Collection<Author> getAuthors() {
        return authorsRepo;
    }

    @Override
    public Author getAuthor(int id) {
        return authorsRepo.stream()
                .filter(author -> author.getId() == id)
                .findAny()
                .orElse(null);
    }

    @Override
    public void createAuthor(Author newAuthor) {
        authorsRepo.add(newAuthor);
    }

    @Override
    public void updateAuthor(int id, Author newAuthor) throws NotFoundException {
        Author to_be_updated = authorsRepo.stream()
                                .filter(author -> author.getId() == id)
                                .findAny()
                                .orElse(null);
        if (to_be_updated != null) {
            to_be_updated.setName(newAuthor.getName());
            to_be_updated.setLastName(newAuthor.getLastName());
        } else {
            throw new NotFoundException("nie ma takiego autora");
        }
    }

    @Override
    public Author deleteAuthor(int id) throws NotFoundException, PermissionDeniedException {
        Author to_be_deleted = authorsRepo.stream()
                .filter(author -> author.getId() == id)
                .findAny()
                .orElse(null);
        if (to_be_deleted != null) {
            if (!to_be_deleted.getBooks().isEmpty()) {
                throw new PermissionDeniedException();
            }
            authorsRepo.remove(to_be_deleted);
            return to_be_deleted;
        } else {
            throw new NotFoundException("nie ma takiego autora");
        }
    }

    @Override
    public void addBook(int id, Book book) {
        Author authorBook = authorsRepo.stream()
                .filter(author -> author.getId() == id)
                .findAny()
                .orElse(null);

        assert authorBook != null;
        authorBook.addBook(book);
    }

    @Override
    public void removeBook(Book book) {
        for (Author author: authorsRepo) {
            author.getBooks().remove(book);
        }
    }
}
