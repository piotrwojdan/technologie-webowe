package pl.pwr.ztw.restapi_ztw.services;

import org.springframework.stereotype.Service;
import pl.pwr.ztw.restapi_ztw.models.Author;
import pl.pwr.ztw.restapi_ztw.models.NotFoundException;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class AuthorService implements IAuthorService{

    private static List<Author> authorsRepo = new ArrayList<>();
    static {
        authorsRepo.add(new Author(1,"Henryk", "Sienkiewicz"));
        authorsRepo.add(new Author(2,"Stanisław", "Reymont"));
        authorsRepo.add(new Author(3,"Adam", "Mickiewicz"));
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
    public Author deleteAuthor(int id) throws NotFoundException {
        Author to_be_deleted = authorsRepo.stream()
                .filter(author -> author.getId() == id)
                .findAny()
                .orElse(null);
        if (to_be_deleted != null) {
            authorsRepo.remove(to_be_deleted);
            return to_be_deleted;
        } else {
            throw new NotFoundException("nie ma takiego autora");
        }
    }
}
