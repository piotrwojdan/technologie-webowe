package pl.webowe.projekt.CinemaReservations.services;

import org.springframework.stereotype.Service;
import pl.webowe.projekt.CinemaReservations.exceptions.NotFoundException;
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
        return cinemaRepository.findById(id).get();
    }

    public Cinema updateCinema(long id, String name, String city) throws NotFoundException {
        if (cinemaRepository.existsById(id)) {
            Cinema cinema = cinemaRepository.findById(id).get();
            cinema.setName(name);
            cinema.setCity(city);
            cinemaRepository.saveAndFlush(cinema);
            return cinema;
        } else {
            throw new NotFoundException();
        }
    }

    public Cinema addCinema(String name, String city) {
        Cinema newCinema = new Cinema();
        newCinema.setCity(city);
        newCinema.setName(name);
        cinemaRepository.saveAndFlush(newCinema);
        return newCinema;
    }


    public boolean deleteCinema(long id) throws NotFoundException {
        if(cinemaRepository.existsById(id)) {

            cinemaRepository.deleteById(id);
            return true;

        } else {
            throw new NotFoundException();
        }

    }

}
