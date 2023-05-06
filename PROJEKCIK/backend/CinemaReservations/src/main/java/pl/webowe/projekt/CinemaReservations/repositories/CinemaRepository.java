package pl.webowe.projekt.CinemaReservations.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.webowe.projekt.CinemaReservations.models.Cinema;

public interface CinemaRepository extends JpaRepository<Cinema, Long> {
}
