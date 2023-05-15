package viewModels;

import jakarta.persistence.*;
import pl.webowe.projekt.CinemaReservations.models.Reservation;
import pl.webowe.projekt.CinemaReservations.models.Room;
import pl.webowe.projekt.CinemaReservations.models.Seat;
import pl.webowe.projekt.CinemaReservations.models.SeatType;

import java.util.List;

public class RoomSeat {

    private long id;
    private int row;
    private int number;
    private SeatType seatType;
    private Room room;
    private List<Reservation> reservations;
    private boolean isTaken;

    public RoomSeat() {
    }

    public RoomSeat(long id, int row, int number, SeatType seatType, Room room, boolean isTaken) {
        this.id = id;
        this.row = row;
        this.seatType = seatType;
        this.room = room;
        this.number = number;
        this.isTaken = isTaken;
    }

    public RoomSeat(Seat seat, boolean isTaken) {
        this.id = seat.getId();
        this.row = seat.getRow();
        this.seatType = seat.getSeatType();
        this.room = seat.getRoom();
        this.number = seat.getNumber();
        this.isTaken = isTaken;
    }

    public boolean isTaken() {
        return isTaken;
    }

    public void setTaken(boolean taken) {
        isTaken = taken;
    }
}
