package pl.pwr.ztw.restapi_ztw.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.Collection;

public class Author {
    private int id;
    private String name;
    private String lastName;
    @JsonIgnore
    private Collection<Book> books;

    public Author(int id, String name, String lastName) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        books = new ArrayList<>();
    }

    public Author(int id, String name, String lastName, Collection<Book> list) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        books = list;
    }

    public Author(){
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

    public void setId(int id) {
        this.id = id;
    }

    public void addBook(Book book){
        books.add(book);
    }
}
