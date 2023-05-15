package pl.webowe.projekt.CinemaReservations.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.webowe.projekt.CinemaReservations.models.Cinema;
import pl.webowe.projekt.CinemaReservations.models.Reservation;

import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    Reservation findBySeatIdAndScreeningId(Long seatId, Long screeningId);

    List<Reservation> findByScreeningId(Long screeningId);
}
