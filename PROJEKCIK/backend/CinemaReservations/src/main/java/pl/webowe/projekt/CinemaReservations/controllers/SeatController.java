package pl.webowe.projekt.CinemaReservations.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import pl.webowe.projekt.CinemaReservations.services.SeatService;
import pl.webowe.projekt.CinemaReservations.viewModels.RoomSeat;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SeatController {
    private final SeatService seatService;

    public SeatController(SeatService seatService) {
        this.seatService = seatService;
    }

    @GetMapping(value = "/seats/{id}")
    public ResponseEntity<List<RoomSeat>> getSeatsForScreening(@PathVariable("id") Long id) {
        return new ResponseEntity<>(seatService.getSeatsForScreening(id), HttpStatus.OK);
    }
}
