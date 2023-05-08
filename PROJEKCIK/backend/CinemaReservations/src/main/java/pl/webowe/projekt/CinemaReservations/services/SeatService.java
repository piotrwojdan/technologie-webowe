package pl.webowe.projekt.CinemaReservations.services;

import org.springframework.stereotype.Service;
import pl.webowe.projekt.CinemaReservations.repositories.RoomRepository;
import pl.webowe.projekt.CinemaReservations.repositories.SeatRepository;
import pl.webowe.projekt.CinemaReservations.repositories.SeatTypeRepository;

@Service
public class SeatService {
    private final SeatRepository seatRepo;
    private final SeatTypeRepository seatTypeRepo;
    private final RoomRepository roomRepo;

    public SeatService(SeatRepository seatRepo, SeatTypeRepository seatTypeRepo, RoomRepository roomRepo) {
        this.seatRepo = seatRepo;
        this.seatTypeRepo = seatTypeRepo;
        this.roomRepo = roomRepo;
    }

    // do przemyslenia glebokiego z winem i czyms mocniejszym
}
