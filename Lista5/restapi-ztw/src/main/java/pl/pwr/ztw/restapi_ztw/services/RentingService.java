package pl.pwr.ztw.restapi_ztw.services;

import org.springframework.stereotype.Service;
import pl.pwr.ztw.restapi_ztw.models.Book;
import pl.pwr.ztw.restapi_ztw.models.NotFoundException;
import pl.pwr.ztw.restapi_ztw.models.Reader;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
@Service
public class RentingService implements IRentingService {

    private static List<Reader> readersRepo = new ArrayList<>();
    static {
        readersRepo.add(new Reader(1, "Ada", "Adamska"));
        readersRepo.add(new Reader(2, "Adam", "Adamski"));
    }
    @Override
    public void rentBook(int readerID, Book book) throws NotFoundException {
        Reader reader = readersRepo.stream().filter(r -> r.getId() == readerID).findFirst().orElse(null);

        if (reader != null) {
            reader.rentBook(book);
        } else {
            throw new NotFoundException("No such reader!");
        }
    }

    @Override
    public void returnBook(int readerID, Book book) throws NotFoundException {
        Reader reader = readersRepo.stream().filter(r -> r.getId() == readerID).findFirst().orElse(null);

        if (reader != null) {
            reader.returnBook(book);
        } else {
            throw new NotFoundException("No such reader!");
        }
    }

    @Override
    public Collection<Book> checkRentedBooks(int readerID) throws NotFoundException {
        Reader reader = readersRepo.stream()
                                    .filter(r -> r.getId() == readerID)
                                    .findFirst()
                                    .orElse(null);

        if (reader != null) {
            return reader.getRentedBooks();
        } else {
            throw new NotFoundException("No such reader!");
        }
    }
}
