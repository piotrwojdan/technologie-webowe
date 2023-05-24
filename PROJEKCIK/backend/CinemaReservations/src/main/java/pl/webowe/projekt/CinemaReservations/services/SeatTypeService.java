package pl.webowe.projekt.CinemaReservations.services;

import org.springframework.stereotype.Service;
import pl.webowe.projekt.CinemaReservations.models.SeatType;
import pl.webowe.projekt.CinemaReservations.repositories.SeatTypeRepository;

import java.util.List;

@Service
public class SeatTypeService {

    private final SeatTypeRepository seatTypeRepo;

    public SeatTypeService(SeatTypeRepository seatTypeRepo) {
        this.seatTypeRepo = seatTypeRepo;
    }

    public List<SeatType> getSeatTypes() {
        return seatTypeRepo.findAll();
    }
}
