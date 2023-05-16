package pl.webowe.projekt.CinemaReservations.viewModels;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import pl.webowe.projekt.CinemaReservations.models.Reservation;
import pl.webowe.projekt.CinemaReservations.models.Room;
import pl.webowe.projekt.CinemaReservations.models.Seat;
import pl.webowe.projekt.CinemaReservations.models.SeatType;
import pl.webowe.projekt.CinemaReservations.serializers.SeatTypeSerializer;

import java.util.List;

public class RoomSeat {

    @JsonProperty
    private long id;
    @JsonProperty
    private int row;
    @JsonProperty
    private int number;
    @JsonSerialize(using = SeatTypeSerializer.class)
    private SeatType seatType;
    @JsonIgnore
    private Room room;
    @JsonIgnore
    private List<Reservation> reservations;
    @JsonProperty
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

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getRow() {
        return row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public SeatType getSeatType() {
        return seatType;
    }

    public void setSeatType(SeatType seatType) {
        this.seatType = seatType;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
}
