package pl.pwr.ztw.restapi_ztw.controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.pwr.ztw.restapi_ztw.models.Book;
import pl.pwr.ztw.restapi_ztw.models.NotFoundException;
import pl.pwr.ztw.restapi_ztw.services.IBooksService;
import pl.pwr.ztw.restapi_ztw.services.IRentingService;

@RestController
@CrossOrigin(origins = "http://localhost:8081")
public class RentingController {

    private final IRentingService rentingService;
    private final IBooksService booksService;

    public RentingController(IRentingService rentingService, IBooksService booksService) {
        this.rentingService = rentingService;
        this.booksService = booksService;
    }

    @GetMapping(value = "/renting/{id}")
    public ResponseEntity<Object> checkRentedBooks(@PathVariable int id) {
        try {
        return new ResponseEntity<>(rentingService.checkRentedBooks(id), HttpStatus.OK);
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/renting")
    public HttpStatus rentBook(@RequestBody ObjectNode json) {
        if (json.get("readerID") == null || json.get("bookID") == null) {
            return  HttpStatus.BAD_REQUEST;
        }
        int readerID = json.get("readerID").asInt();
        Book book = booksService.getBook(json.get("bookID").asInt());

        try {
            rentingService.rentBook(readerID, book);
            return HttpStatus.OK;
        } catch (NotFoundException e) {
            return HttpStatus.NOT_FOUND;
        }
    }

    @DeleteMapping (value = "/renting")
    public HttpStatus returnBook(@RequestBody ObjectNode json) {
        if (json.get("readerID") == null || json.get("bookID") == null) {
            return  HttpStatus.BAD_REQUEST;
        }
        int readerID = json.get("readerID").asInt();
        Book book = booksService.getBook(json.get("bookID").asInt());

        try {
            rentingService.returnBook(readerID, book);
            return HttpStatus.OK;
        } catch (NotFoundException e) {
            return HttpStatus.NOT_FOUND;
        }
    }
}
