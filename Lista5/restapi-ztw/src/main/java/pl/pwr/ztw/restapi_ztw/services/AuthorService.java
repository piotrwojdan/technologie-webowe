package pl.pwr.ztw.restapi_ztw.services;

import org.springframework.stereotype.Service;

import pl.pwr.ztw.restapi_ztw.models.AlreadyExistsException;
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
        authorsRepo.add(new Author(1,"Henryk", "Sienkiewicz"));
        authorsRepo.get(0).addBook(new Book(1,"Potop", 936));
        authorsRepo.add(new Author(2,"Stanisław", "Reymont"));
        authorsRepo.get(1).addBook(new Book(2,"Wesele", 150));
        authorsRepo.add(new Author(3,"Adam", "Mickiewicz"));
        authorsRepo.get(2).addBook(new Book(3,"Dziady", 292));
        authorsRepo.add(new Author(4,"Wisława", "Szymborska"));
        authorsRepo.get(2).addBook(new Book(4,"Chwile", 292));
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
    public void createAuthor(Author newAuthor) throws AlreadyExistsException {
        for (Author a: authorsRepo){
            if (a.getName().equals(newAuthor.getName()) && a.getLastName().equals(newAuthor.getLastName())){
                throw new AlreadyExistsException();
            }
        }
        Author newAuthor2 = new Author(authorsRepo.size() + 1, newAuthor.getName(), newAuthor.getLastName(), newAuthor.getBooks());
        authorsRepo.add(newAuthor2);
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
