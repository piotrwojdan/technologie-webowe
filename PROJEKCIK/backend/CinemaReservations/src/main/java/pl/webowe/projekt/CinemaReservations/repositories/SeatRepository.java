package pl.webowe.projekt.CinemaReservations.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.webowe.projekt.CinemaReservations.models.Reservation;
import pl.webowe.projekt.CinemaReservations.models.Seat;

public interface SeatRepository extends JpaRepository<Seat, Long> {
}
