package pl.webowe.projekt.CinemaReservations.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.webowe.projekt.CinemaReservations.models.SeatType;

public interface SeatTypeRepository extends JpaRepository<SeatType, Long> {
}
