package pl.webowe.projekt.CinemaReservations.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import pl.webowe.projekt.CinemaReservations.models.SeatType;
import pl.webowe.projekt.CinemaReservations.services.SeatService;
import pl.webowe.projekt.CinemaReservations.services.SeatTypeService;
import pl.webowe.projekt.CinemaReservations.viewModels.RoomSeat;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SeatTypeController {
    private final SeatTypeService seatTypeService;

    public SeatTypeController(SeatTypeService seatTypeService) {
        this.seatTypeService = seatTypeService;
    }

    @GetMapping(value = "/seattypes")
    public ResponseEntity<List<SeatType>> getSeatTypes() {
        return new ResponseEntity<>(seatTypeService.getSeatTypes(), HttpStatus.OK);
    }
}
