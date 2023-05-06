package pl.webowe.projekt.CinemaReservations.services;

import org.springframework.stereotype.Service;
import pl.webowe.projekt.CinemaReservations.models.Cinema;
import pl.webowe.projekt.CinemaReservations.repositories.CinemaRepository;

import java.util.List;

@Service
public class CinemaService {
    private final CinemaRepository cinemaRepository;

    public CinemaService(CinemaRepository cinemaRepository) {
        this.cinemaRepository = cinemaRepository;
    }

    public List<Cinema> getAllCinemas() {
        return cinemaRepository.findAll();
    }

    public Cinema getCinema(long id) {
        return cinemaRepository.getReferenceById(id);
    }

    public Cinema updateCinema(long id, String name, String city) {
        if (cinemaRepository.existsById(id)) {
            Cinema cinema = cinemaRepository.getReferenceById(id);
            cinema.setName(name);
            cinema.setCity(city);
            cinemaRepository.saveAndFlush(cinema);
            return cinema;
        } else {
            throw new RuntimeException();
        }
    }

    public Cinema addCinema(String name, String city) {
        Cinema newCinema = new Cinema(name, city);
        cinemaRepository.saveAndFlush(newCinema);
        return newCinema;
    }


    public boolean deleteCinema(long id){
        if(cinemaRepository.existsById(id)) {

            cinemaRepository.deleteById(id);
            return true;

        } else {
            throw new RuntimeException();
        }

    }

}
