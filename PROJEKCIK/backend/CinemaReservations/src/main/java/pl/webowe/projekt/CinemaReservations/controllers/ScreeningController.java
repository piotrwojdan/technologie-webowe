package pl.webowe.projekt.CinemaReservations.controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.webowe.projekt.CinemaReservations.exceptions.NotFoundException;
import pl.webowe.projekt.CinemaReservations.models.Screening;
import pl.webowe.projekt.CinemaReservations.services.ScreeningService;
import pl.webowe.projekt.CinemaReservations.util.Verifier;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ScreeningController {

    private final ScreeningService screeningService;

    public ScreeningController(ScreeningService screeningService) {
        this.screeningService = screeningService;
    }

    @GetMapping(value = "/screenings")
    public ResponseEntity<List<Screening>> getAllScreenings() {
        return new ResponseEntity<>(screeningService.getAllScreenings(), HttpStatus.OK);
    }

    @GetMapping(value = "/screenings/{id}")
    public ResponseEntity<Screening> getScreeningById(@PathVariable("id") long id){
        return new ResponseEntity<>(screeningService.getScreening(id), HttpStatus.OK);
    }

    @PostMapping(value = "/screenings")
    public ResponseEntity<Screening> addScreening(@RequestHeader("Authorization") String authorizationHeader, @RequestBody ObjectNode json){
        String accessToken = authorizationHeader.replace("Bearer ", "");

        var payload = Verifier.verify(accessToken);

        if (payload != null) {
            if (!json.has("time") || !json.has("movie_id") || !json.has("room_id"))
                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

            try {
                return new ResponseEntity<>(screeningService.addScreening(LocalDateTime.parse(json.get("time").asText()), json.get("movie_id").asInt(), json.get("room_id").asInt()), HttpStatus.CREATED);
            } catch (NotFoundException e) {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity<>(null, HttpStatus.NETWORK_AUTHENTICATION_REQUIRED);
        }
    }

    @PutMapping(value = "/screenings/{id}")
    public ResponseEntity<Screening> updateScreening(@PathVariable Long id, @RequestBody ObjectNode json){
        if (!json.has("time") || !json.has("movie_id") || !json.has("room_id"))
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        try {
            Screening screening = screeningService.updateScreening(id, LocalDateTime.parse(json.get("time").asText()), json.get("movie_id").asInt(), json.get("room_id").asInt());
            return new ResponseEntity<>(screening, HttpStatus.OK);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping(value = "/screenings/{id}")
    public ResponseEntity<Screening> deleteScreening(@PathVariable("id") Long id){
        try{
            screeningService.deleteScreening(id);
            return new ResponseEntity<>(null,HttpStatus.OK);
        } catch (NotFoundException e){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping(value = "screenings/cinema/{id}")
    public ResponseEntity<List<Screening>> getScreeningsInCinema(@PathVariable("id") Long id) {
        try {
            return new ResponseEntity<>(screeningService.getScreeningsInCinema(id), HttpStatus.OK);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
