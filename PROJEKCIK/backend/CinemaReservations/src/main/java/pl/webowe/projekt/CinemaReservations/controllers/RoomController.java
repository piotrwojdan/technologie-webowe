package pl.webowe.projekt.CinemaReservations.controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.webowe.projekt.CinemaReservations.exceptions.NotFoundException;
import pl.webowe.projekt.CinemaReservations.models.Room;
import pl.webowe.projekt.CinemaReservations.services.RoomService;

import java.util.List;

@RestController
@CrossOrigin
public class RoomController {
    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping(value = "/rooms")
    public ResponseEntity<List<Room>> getAllRooms() {
        return new ResponseEntity<>(roomService.getAllRooms(), HttpStatus.OK);
    }

    @GetMapping(value = "/rooms/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable("id") long id){
        return new ResponseEntity<>(roomService.getRoom(id), HttpStatus.OK);
    }

    @PostMapping(value = "/rooms")
    public ResponseEntity<Room> addRoom(@RequestBody ObjectNode json){
        // screenSize, int screenX, int screenY, long cinemaID
        if (
                !json.has("name") ||
                !json.has("screenSize") ||
                !json.has("screenX") ||
                !json.has("screenY") ||
                !json.has("cinemaID")
        )
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        try {
            return new ResponseEntity<>(roomService.addRoom(
                    json.get("name").asText(),
                    json.get("screenSize").asInt(),
                    json.get("screenX").asInt(),
                    json.get("screenY").asInt(),
                    json.get("cinemaID").asInt()),
                    HttpStatus.CREATED);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(value = "/rooms/{id}")
    public ResponseEntity<Room> updateRoom(@PathVariable Long id, @RequestBody ObjectNode json){
        if (
                !json.has("name") ||
                !json.has("screenSize") ||
                !json.has("screenX") ||
                !json.has("screenY")
        )
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        try {
            Room room = roomService.updateRoom(
                    id,
                    json.get("name").asText(),
                    json.get("screenSize").asInt(),
                    json.get("screenX").asInt(),
                    json.get("screenY").asInt()
            );
            return new ResponseEntity<>(room, HttpStatus.OK);
        } catch (NotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping(value = "/rooms/{id}")
    public ResponseEntity<Room> deleteRoom(@PathVariable("id") Long id){
        try{
            roomService.deleteRoom(id);
            return new ResponseEntity<>(null,HttpStatus.OK);
        } catch (NotFoundException e){
            return new ResponseEntity<>(null,HttpStatus.NOT_FOUND);
        }
    }
}
