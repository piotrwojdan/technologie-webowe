package pl.pwr.ztw.restapi_ztw.models;

import java.util.ArrayList;
import java.util.Collection;

public class Author {
    private int id;
    private String name;
    private String lastName;
    private Collection<Book> books;

    public Author(int id, String name, String lastName) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        books = new ArrayList<>();
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

    public Collection<Book> getBooks() {
        return books;
    }

    public void addBook(Book book){
        books.add(book);
    }
}
