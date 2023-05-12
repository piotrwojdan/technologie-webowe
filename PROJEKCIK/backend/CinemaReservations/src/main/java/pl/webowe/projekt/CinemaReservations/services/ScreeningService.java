package pl.webowe.projekt.CinemaReservations.services;

import org.springframework.stereotype.Service;
import pl.webowe.projekt.CinemaReservations.exceptions.NotFoundException;
import pl.webowe.projekt.CinemaReservations.models.Cinema;
import pl.webowe.projekt.CinemaReservations.models.Room;
import pl.webowe.projekt.CinemaReservations.models.Screening;
import pl.webowe.projekt.CinemaReservations.repositories.CinemaRepository;
import pl.webowe.projekt.CinemaReservations.repositories.RoomRepository;
import pl.webowe.projekt.CinemaReservations.repositories.ScreeningRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ScreeningService {
    private final ScreeningRepository screeningRepository;
    private final RoomRepository roomRepository;

    public ScreeningService(ScreeningRepository screeningRepository, RoomRepository roomRepository) {
        this.screeningRepository = screeningRepository;
        this.roomRepository = roomRepository;
    }

    public List<Screening> getAllScreenings() {
        return screeningRepository.findAll();
    }

    public Screening getScreening(long id) {
        return screeningRepository.findById(id).get();
    }

    public Screening updateScreening(long id, LocalDateTime time, long movie_id, long room_id) throws NotFoundException {
        if (screeningRepository.existsById(id) && roomRepository.existsById(room_id)) {
            Screening screening = screeningRepository.findById(id).get();
            screening.setTime(time);
            screening.setMovie_id(movie_id);
            Room room = roomRepository.findById(room_id).get();
            screening.setRoom(room);
            return screening;

        } else {
            throw new NotFoundException();
        }
    }

    public Screening addScreening(LocalDateTime time, long movie_id, long roomId) throws NotFoundException {
        if (roomRepository.existsById(roomId)) {
            Screening newScreening = new Screening();
            newScreening.setTime(time);
            newScreening.setMovie_id(movie_id);
            newScreening.setRoom(roomRepository.findById(roomId).get());
            screeningRepository.saveAndFlush(newScreening);
            return newScreening;
        } else {
            throw new NotFoundException();
        }
    }


    public boolean deleteScreening(long id) throws NotFoundException {
        if(screeningRepository.existsById(id)) {
            screeningRepository.deleteById(id);
            return true;

        } else {
            throw new NotFoundException();
        }

    }

    public List<Screening> getScreeningsInCinema(long cinemaId) throws NotFoundException {
        List<Room> rooms = roomRepository.findAll().stream().filter(r -> r.getIdCinema() == cinemaId).toList();

        if (rooms.isEmpty())
            throw new NotFoundException();

        List<Screening> resultList = new ArrayList<>();

        for (Room room: rooms) {
            resultList.addAll(room.getScreenings());
        }
        return resultList;
    }
}
