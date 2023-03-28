package pl.pwr.ztw.restapi_ztw.models;

import java.util.ArrayList;
import java.util.Collection;

public class Reader {
    private int id;
    private String name;
    private String lastName;
    private Collection<Book> rentedBooks;

    public Reader(int id, String name, String lastName) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        rentedBooks = new ArrayList<>();
    }
    public Reader() {
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void rentBook(Book book) {
        rentedBooks.add(book);
    }

    public void returnBook(Book book) {
        rentedBooks.remove(book);
    }

    public Collection<Book> getRentedBooks() {
        return rentedBooks;
    }
}
