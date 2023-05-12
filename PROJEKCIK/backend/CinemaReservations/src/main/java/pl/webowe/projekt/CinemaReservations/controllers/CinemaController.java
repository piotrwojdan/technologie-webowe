package pl.webowe.projekt.CinemaReservations.controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.webowe.projekt.CinemaReservations.exceptions.NotFoundException;
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

    @PostMapping(value = "/cinemas")
    public ResponseEntity<Cinema> addCinema(@RequestBody ObjectNode json){
        if (!json.has("name") || !json.has("city"))
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        return new ResponseEntity<>(cinemaService.addCinema(json.get("name").asText(), json.get("city").asText()), HttpStatus.CREATED);

    }

    @PutMapping(value = "/cinemas/{id}")
    public ResponseEntity<Cinema> updateCinema(@PathVariable Long id, @RequestBody ObjectNode json){
        if (!json.has("name") || !json.has("city"))
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        try {
            Cinema cinema = cinemaService.updateCinema(id, json.get("name").asText(), json.get("city").asText());
            return new ResponseEntity<>(cinema, HttpStatus.OK);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping(value = "/cinemas/{id}")
    public ResponseEntity<Cinema> deleteCinema(@PathVariable("id") Long id){
        try{
            cinemaService.deleteCinema(id);
            return new ResponseEntity<>(null,HttpStatus.OK);
        } catch (NotFoundException e){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }



}
