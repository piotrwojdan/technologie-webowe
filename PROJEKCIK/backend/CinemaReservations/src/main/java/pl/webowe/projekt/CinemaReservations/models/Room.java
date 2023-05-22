package pl.webowe.projekt.CinemaReservations.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue
    private long id;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "screen_size", nullable = false)
    private int screenSize;
    @Column(name = "screen_x", nullable = false)
    private int screenX;
    @Column(name = "screen_y", nullable = false)
    private int screenY;
    @Column(name = "rows_number", nullable = false)
    private int rowsNumber;
    @Column(name = "seats_number", nullable = false)
    private int seatsNumber;

    @JoinColumn(name = "cinema_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Cinema idCinema;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "room_id")
    private List<Seat> seats = new ArrayList<>();

    @JsonIgnore
    @OneToMany
    @JoinColumn(name = "room_id")
    private List<Screening> screenings;

    public Room() {
    }

    public Room(long id, String name, int screenSize, int screenX, int screenY, int rowsNumber, int seatsNumber) {
        this.id = id;
        this.name = name;
        this.screenSize = screenSize;
        this.screenX = screenX;
        this.screenY = screenY;
        this.rowsNumber = rowsNumber;
        this.seatsNumber = seatsNumber;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getScreenSize() {
        return screenSize;
    }

    public void setScreenSize(int screenSize) {
        this.screenSize = screenSize;
    }

    public int getScreenX() {
        return screenX;
    }

    public void setScreenX(int screenX) {
        this.screenX = screenX;
    }

    public int getScreenY() {
        return screenY;
    }

    public void setScreenY(int screenY) {
        this.screenY = screenY;
    }

    public long getIdCinema() {
        return idCinema.getId();
    }

    public void setIdCinema(Cinema idCinema) {
        this.idCinema = idCinema;
    }

    public List<Screening> getScreenings() {
        return screenings;
    }

    public List<Seat> getSeats() {
        return seats;
    }

    public void setSeats(List<Seat> seats) {
        this.seats = seats;
    }

    public int getRowsNumber() {
        return rowsNumber;
    }

    public void setRowsNumber(int rowsNumber) {
        this.rowsNumber = rowsNumber;
    }

    public int getSeatsNumber() {
        return seatsNumber;
    }

    public void setSeatsNumber(int seatsNumber) {
        this.seatsNumber = seatsNumber;
    }
}
