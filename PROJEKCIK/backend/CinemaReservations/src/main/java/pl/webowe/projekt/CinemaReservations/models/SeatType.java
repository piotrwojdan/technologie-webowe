package pl.webowe.projekt.CinemaReservations.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "seat_types")
public class SeatType {
    @Id
    @GeneratedValue
    private long id;
    @Column(name = "type", nullable = false, unique = true)
    private String type;
    @Column(name = "price", nullable = false)
    private double price;

    @JsonIgnore
    @OneToMany()
    @JoinColumn(name = "seat_type_id")
    private List<Seat> seats = new ArrayList<>();

    public SeatType() {
    }

    public SeatType(long id, String type, double price) {
        this.id = id;
        this.type = type;
        this.price = price;
    }

    public long getId() {
        return id;
    }


    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public List<Seat> getSeats() {
        return seats;
    }
}
