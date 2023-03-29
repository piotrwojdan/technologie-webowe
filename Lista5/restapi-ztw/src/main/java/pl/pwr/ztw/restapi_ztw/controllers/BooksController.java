package pl.pwr.ztw.restapi_ztw.controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pwr.ztw.restapi_ztw.models.Author;
import pl.pwr.ztw.restapi_ztw.models.Book;
import pl.pwr.ztw.restapi_ztw.models.NotFoundException;
import pl.pwr.ztw.restapi_ztw.services.AuthorService;
import pl.pwr.ztw.restapi_ztw.services.IAuthorService;
import pl.pwr.ztw.restapi_ztw.services.IBooksService;

import java.util.Iterator;

@RestController
public class BooksController {
    final IBooksService booksService;
    final IAuthorService authorService;

    public BooksController(IBooksService booksService, IAuthorService authorService) {
        this.booksService = booksService;
        this.authorService = authorService;
    }

    @GetMapping(value = "/books")
    public ResponseEntity<Object> getBooks(){
        return new ResponseEntity<>(booksService.getBooks(), HttpStatus.OK);
    }

    @GetMapping(value = "/books/{id}")
    public ResponseEntity<Object> getBook(@PathVariable("id") int id){
        return new ResponseEntity<>(booksService.getBook(id), HttpStatus.OK);
    }

    @PostMapping(value = "/books")
    public HttpStatus createBook(@RequestBody ObjectNode json){
        Book newBook = new Book(json.get("title").asText(), json.get("pages").asInt());
        if (json.get("authorID").isArray()) {
            Iterator<JsonNode> iterator = json.get("authorID").elements();
            while (iterator.hasNext()) {
                int id = iterator.next().asInt();
                Author author = authorService.getAuthor(id);
                authorService.addBook(id, newBook);
                newBook.addAuthor(author);
            }
        } else {
            Author author = authorService.getAuthor(json.get("authorID").asInt());
            newBook.addAuthor(author);
        }
        booksService.createBook(newBook);
        return HttpStatus.CREATED;
        
    }

    @PutMapping(value = "/books/{id}")
    public ResponseEntity<Object> updateBook(@RequestBody Book newBook, @PathVariable("id") int id){
        try {
            booksService.updateBook(id, newBook);
            return new ResponseEntity<>(newBook, HttpStatus.OK);
        } catch (NotFoundException e) {
            return new ResponseEntity<>("Invalid data", HttpStatus.NOT_FOUND);
        }
        
    }

    @DeleteMapping(value = "/books/{id}")
    public ResponseEntity<Object> deleteBook(@PathVariable("id") int id) {
        try {
            Book book = booksService.deleteBook(id);
            authorService.removeBook(book);
            return new ResponseEntity<>(book, HttpStatus.OK);

        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}