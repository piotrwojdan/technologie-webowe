package pl.webowe.projekt.CinemaReservations.services;

import org.springframework.stereotype.Service;
import pl.webowe.projekt.CinemaReservations.exceptions.NotFoundException;
import pl.webowe.projekt.CinemaReservations.models.Cinema;
import pl.webowe.projekt.CinemaReservations.models.Room;
import pl.webowe.projekt.CinemaReservations.repositories.CinemaRepository;
import pl.webowe.projekt.CinemaReservations.repositories.RoomRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RoomService {
    private final RoomRepository roomRepo;
    private  final CinemaRepository cinemaRepo;

    public RoomService(RoomRepository roomRepo,CinemaRepository cinemaRepo) {
        this.roomRepo = roomRepo;
        this.cinemaRepo = cinemaRepo;
    }

    public List<Room> getAllRooms() {
        return roomRepo.findAll();
    }

    public Room getRoom(long id) {
        return roomRepo.findById(id).get();
    }

    public List<Room> getRoomsInCinema(long cinemaId) throws NotFoundException {
        if (!cinemaRepo.existsById(cinemaId))
            throw new NotFoundException();
        Cinema cinema = cinemaRepo.findById(cinemaId).get();
        return roomRepo.findByIdCinema(cinema);
    }

    public Room updateRoom(long id, String name, int screenSize, int screenX, int screenY) throws NotFoundException {
        if (roomRepo.existsById(id)) {
            Room room = roomRepo.findById(id).get();
            room.setScreenSize(screenSize);
            room.setName(name);
            room.setScreenX(screenX);
            room.setScreenY(screenY);
            roomRepo.saveAndFlush(room);
            return room;
        } else {
            throw new NotFoundException();
        }
    }

    public Room addRoom(String name, int screenSize, int screenX, int screenY, long cinemaID) throws NotFoundException {
        Room newRoom = new Room();
        newRoom.setScreenSize(screenSize);
        newRoom.setName(name);
        newRoom.setScreenX(screenX);
        newRoom.setScreenY(screenY);

        Optional<Cinema> cinema = cinemaRepo.findById(cinemaID);
        if (cinema.isPresent()) {
            newRoom.setIdCinema(cinema.get());
        } else {
            throw new NotFoundException();
        }

        roomRepo.saveAndFlush(newRoom);
        return newRoom;
    }


    public boolean deleteRoom(long id) throws NotFoundException {
        if(roomRepo.existsById(id)) {

            roomRepo.deleteById(id);
            return true;

        } else {
            throw new NotFoundException();
        }

    }
}
