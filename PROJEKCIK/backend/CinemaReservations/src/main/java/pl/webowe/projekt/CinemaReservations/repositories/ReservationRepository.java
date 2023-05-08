package pl.webowe.projekt.CinemaReservations.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.webowe.projekt.CinemaReservations.models.Cinema;
import pl.webowe.projekt.CinemaReservations.models.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
}
