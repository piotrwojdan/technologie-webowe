package pl.pwr.ztw.restapi_ztw.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pwr.ztw.restapi_ztw.models.Book;
import pl.pwr.ztw.restapi_ztw.models.NotFoundException;
import pl.pwr.ztw.restapi_ztw.services.IBooksService;

@RestController
public class BooksController {
    final IBooksService booksService;

    public BooksController(IBooksService booksService) {
        this.booksService = booksService;
    }

    @GetMapping(value = "/books")
    public ResponseEntity<Object> getBooks(){
        return new ResponseEntity<>(booksService.getBooks(), HttpStatus.OK);
    }

    @GetMapping(value = "/books/{id}")
    public ResponseEntity<Object> getBook(@PathVariable("id") int id){
        return new ResponseEntity<>(booksService.getBook(id), HttpStatus.OK);
    }

    @PutMapping(value = "/books/{id}")
    public HttpStatus updateBook(@RequestBody Book newBook, @PathVariable("id") int id){
        try {
            booksService.updateBook(id, newBook);
            return HttpStatus.OK;
        } catch (NotFoundException e) {
            return HttpStatus.NOT_FOUND;
        }
    }

    @DeleteMapping(value = "/books/{id}")
    public ResponseEntity<Object> deleteBook(@PathVariable("id") int id) {
        try {
            return new ResponseEntity<>(booksService.deleteBook(id), HttpStatus.OK);

        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}