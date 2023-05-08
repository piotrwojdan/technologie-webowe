package pl.webowe.projekt.CinemaReservations.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.webowe.projekt.CinemaReservations.models.Seat;

public interface SeatTypeRepository extends JpaRepository<Seat, Long> {
}
