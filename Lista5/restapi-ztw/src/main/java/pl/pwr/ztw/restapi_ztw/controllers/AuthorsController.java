package pl.pwr.ztw.restapi_ztw.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pwr.ztw.restapi_ztw.models.Author;
import pl.pwr.ztw.restapi_ztw.models.NotFoundException;
import pl.pwr.ztw.restapi_ztw.services.IAuthorService;

@RestController
public class AuthorsController {

    final IAuthorService authorService;

    public AuthorsController(IAuthorService authorService) {
        this.authorService = authorService;
    }

    @GetMapping(value = "/authors")
    public ResponseEntity<Object> getAuthors(){
        return new ResponseEntity<>(authorService.getAuthors(), HttpStatus.OK);
    }

    @GetMapping(value = "/authors/{id}")
    public ResponseEntity<Object> getAuthor(@PathVariable("id") int id){
        return new ResponseEntity<>(authorService.getAuthor(id), HttpStatus.OK);
    }

    @PostMapping(value = "/authors")
    public HttpStatus createAuthor(@RequestBody Author newAuthor) {
        authorService.createAuthor(newAuthor);
        return HttpStatus.OK;
    }

    @PutMapping(value = "/authors/{id}")
    public HttpStatus updateBook(@RequestBody Author newAuthor, @PathVariable("id") int id){
        try {
            authorService.updateAuthor(id, newAuthor);
            return HttpStatus.OK;
        } catch (NotFoundException e) {
            return HttpStatus.NOT_FOUND;
        }
    }

    @DeleteMapping(value = "/authors/{id}")
    public ResponseEntity<Object> deleteBook(@PathVariable("id") int id) {
        try {
            return new ResponseEntity<>(authorService.deleteAuthor(id), HttpStatus.OK);

        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
