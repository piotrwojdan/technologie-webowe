package pl.pwr.ztw.restapi_ztw;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
@Service
public class BooksService implements IBooksService {
    private static List<Book> booksRepo = new ArrayList<>();
    static {
        booksRepo.add(new Book(1,"Potop", "Henryk Sienkiewicz", 936));
        booksRepo.add(new Book(2,"Wesele", "Stanisław Reymont", 150));
        booksRepo.add(new Book(3,"Dziady", "Adam Mickiewicz", 292));
    }
    @Override
    public Collection<Book> getBooks() {
        return booksRepo;
    }

    @Override
    public Book getBook(int id) {
        return booksRepo.stream()
                .filter(b -> b.getId() == id)
                .findAny()
                .orElse(null);
    }

    @Override
    public void updateBook(int id,  Book newBook) throws NotFoundException {
        Book to_be_updated = booksRepo.stream()
                            .filter(b -> b.getId() == id)
                            .findAny()
                            .orElse(null);

        if (to_be_updated != null) {
            to_be_updated.setAuthor(newBook.getAuthor());
            to_be_updated.setPages(newBook.getPages());
            to_be_updated.setTitle(newBook.getTitle());
        } else {
            throw new NotFoundException("Book not found!");
        }
    }

    @Override
    public Book deleteBook(int id) throws NotFoundException {
        Book to_be_deleted = booksRepo.stream()
                .filter(b -> b.getId() == id)
                .findAny()
                .orElse(null);
        if (to_be_deleted != null) {
            booksRepo.remove(to_be_deleted);
            return to_be_deleted;
        } else {
            throw new NotFoundException("Book not found!");
        }
    }
}