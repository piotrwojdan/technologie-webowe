package pl.webowe.projekt.CinemaReservations.controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.webowe.projekt.CinemaReservations.exceptions.NotFoundException;
import pl.webowe.projekt.CinemaReservations.models.Reservation;
import pl.webowe.projekt.CinemaReservations.models.Room;
import pl.webowe.projekt.CinemaReservations.services.ReservationService;
import pl.webowe.projekt.CinemaReservations.services.RoomService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ReservationController {
    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping(value = "/reservations")
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return new ResponseEntity<>(reservationService.getAllReservations(), HttpStatus.OK);
    }

    @GetMapping(value = "/reservations/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable("id") long id){
        return new ResponseEntity<>(reservationService.getReservation(id), HttpStatus.OK);
    }

    @PostMapping(value = "/reservations")
    public ResponseEntity<Reservation> addReservation(@RequestBody ObjectNode json){
        if (
                !json.has("client_mail") ||
                !json.has("seat_id") ||
                !json.has("screening")

        )
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        try {
            return new ResponseEntity<>(reservationService.addReservation(
                    json.get("client_mail").asText(),
                    json.get("seat_id").asInt(),
                    json.get("screening").asInt()),
                    HttpStatus.CREATED);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }


    //tego chyba nie ma potrzeby robić
    @PutMapping(value = "/reservations/{id}")
    public ResponseEntity<Room> updateReservation(@PathVariable Long id, @RequestBody ObjectNode json){
            return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
    }


    @DeleteMapping(value = "/reservations/{id}")
    public ResponseEntity<Reservation> deleteReservation(@PathVariable("id") Long id){
        try{
            reservationService.deleteReservation(id);
            return new ResponseEntity<>(null,HttpStatus.OK);
        } catch (NotFoundException e){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }
}
