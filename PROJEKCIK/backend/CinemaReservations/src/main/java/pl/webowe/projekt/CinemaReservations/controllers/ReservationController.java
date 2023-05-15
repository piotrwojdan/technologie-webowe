package pl.webowe.projekt.CinemaReservations.controllers;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.webowe.projekt.CinemaReservations.exceptions.NotFoundException;
import pl.webowe.projekt.CinemaReservations.models.Reservation;
import pl.webowe.projekt.CinemaReservations.models.Room;
import pl.webowe.projekt.CinemaReservations.models.Seat;
import pl.webowe.projekt.CinemaReservations.services.ReservationService;
import pl.webowe.projekt.CinemaReservations.services.RoomService;

import java.time.LocalDateTime;
import java.util.ArrayDeque;
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
                !json.has("screening") ||
                        !json.has("reservation_date")

        )
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        try {
            return new ResponseEntity<>(reservationService.addReservation(
                    json.get("client_mail").asText(),
                    json.get("seat_id").asInt(),
                    json.get("screening").asInt(),
                    LocalDateTime.parse(json.get("reservation_date").asText())),
                    HttpStatus.CREATED);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }


    @PutMapping(value = "/reservations")
    public ResponseEntity<List<Reservation>> updateReservation(@RequestBody ObjectNode json){
        if (
                !json.has("client_mail") ||
                        !json.has("seat_id") ||
                        !json.has("screening") ||
                        !json.has("reservation_date")

        )
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        try {

                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode jsonNode = objectMapper.convertValue(json.get("seat_id"), JsonNode.class);
                List<Long> seats_ids = objectMapper.convertValue(jsonNode, new TypeReference<>() {
                });

                return new ResponseEntity<>(reservationService.updateReservations(
                        json.get("client_mail").asText(),
                        seats_ids,
                        json.get("screening").asInt(),
                        LocalDateTime.parse(json.get("reservation_date").asText())),
                        HttpStatus.CREATED);

        } catch (NotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }    }


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
