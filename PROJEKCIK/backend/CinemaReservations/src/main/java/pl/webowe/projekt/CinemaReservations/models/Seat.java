package pl.webowe.projekt.CinemaReservations.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "seats")
public class Seat {
    @Id
    @GeneratedValue
    private long id;
    @Column(name = "seat_row", nullable = false)
    private int row;
    @Column(name = "seat_number", nullable = false)
    private int number;
    @JoinColumn(name = "seat_type_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private SeatType seatType;

    @JoinColumn(name = "room_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Room room;

    @JoinColumn(name = "seat_id")
    @OneToMany(cascade = CascadeType.ALL)
    private List<Reservation> reservations;

    public Seat() {
    }

    public Seat(long id, int row, int number, SeatType seatType, Room room) {
        this.id = id;
        this.row = row;
        this.seatType = seatType;
        this.room = room;
        this.number = number;
    }

    public long getId() {
        return id;
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
}
