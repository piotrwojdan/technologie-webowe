package pl.pwr.ztw.restapi_ztw.models;

import java.util.ArrayList;
import java.util.Collection;

public class Book {
    private int id;
    private String title;
    private Collection<Author> authors;
    int pages;
    public Book(int id, String title, int pages, Author author) {
        this.id = id;
        this.title = title;
        this.pages = pages;
        this.authors = new ArrayList<>();
        authors.add(author);
    }

    public int getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public int getPages() { return pages; }
    public void setPages(int pages) { this.pages = pages; }

    public Collection<Author> getAuthors() {
        return authors;
    }

}