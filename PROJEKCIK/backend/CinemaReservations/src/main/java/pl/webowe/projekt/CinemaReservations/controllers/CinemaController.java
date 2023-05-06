package pl.webowe.projekt.CinemaReservations.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import pl.webowe.projekt.CinemaReservations.models.Cinema;
import pl.webowe.projekt.CinemaReservations.services.CinemaService;

import java.util.List;

@CrossOrigin
@RestController
public class CinemaController {
    private final CinemaService cinemaService;

    public CinemaController(CinemaService cinemaService) {
        this.cinemaService = cinemaService;
    }

    @GetMapping(value = "/cinemas")
    public ResponseEntity<List<Cinema>> getAllCinemas() {
        return new ResponseEntity<>(cinemaService.getAllCinemas(), HttpStatus.OK);
    }

    @GetMapping(value = "/cinemas/{id}")
    public ResponseEntity<Cinema> getCinemaById(@PathVariable("id") long id){
        return new ResponseEntity<>(cinemaService.getCinema(id), HttpStatus.OK);
    }


}
