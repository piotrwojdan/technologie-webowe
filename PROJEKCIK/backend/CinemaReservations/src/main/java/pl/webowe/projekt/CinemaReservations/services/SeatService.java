package pl.webowe.projekt.CinemaReservations.services;

import org.springframework.stereotype.Service;
import pl.webowe.projekt.CinemaReservations.models.Reservation;
import pl.webowe.projekt.CinemaReservations.repositories.ReservationRepository;
import pl.webowe.projekt.CinemaReservations.repositories.RoomRepository;
import pl.webowe.projekt.CinemaReservations.repositories.SeatRepository;
import pl.webowe.projekt.CinemaReservations.repositories.SeatTypeRepository;
import pl.webowe.projekt.CinemaReservations.viewModels.RoomSeat;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class SeatService {
    private final SeatRepository seatRepo;
    private final SeatTypeRepository seatTypeRepo;
    private final RoomRepository roomRepo;
    private final ReservationRepository reservationRepo;

    public SeatService(SeatRepository seatRepo, SeatTypeRepository seatTypeRepo, RoomRepository roomRepo, ReservationRepository reservationRepo) {
        this.seatRepo = seatRepo;
        this.seatTypeRepo = seatTypeRepo;
        this.roomRepo = roomRepo;
        this.reservationRepo = reservationRepo;
    }

    public List<RoomSeat> getSeatsForScreening(long sreening_id){
        List<Reservation> reservations = reservationRepo.findByScreeningId(sreening_id);
        List<RoomSeat> roomSeats = new ArrayList<>();
        for(Reservation r: reservations) {
            RoomSeat roomSeat = new RoomSeat(r.getSeat(), r.getClient_mail() != null || r.getReservation_date().isAfter(LocalDateTime.now()));
            roomSeats.add(roomSeat);
        }
        return roomSeats;
    }



}
