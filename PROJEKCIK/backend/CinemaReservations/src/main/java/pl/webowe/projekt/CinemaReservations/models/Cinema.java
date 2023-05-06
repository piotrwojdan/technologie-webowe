package pl.webowe.projekt.CinemaReservations.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Cinemas")
public class Cinema {
    @Id
    @GeneratedValue
    private long id;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "city", nullable = false)
    private String city;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "cinema_id")
    private List<Room> rooms = new ArrayList<>();

    public Cinema() {

    }

    public Cinema(long id, String name, String city) {
        this.id = id;
        this.name = name;
        this.city = city;
    }

    public Cinema(String name, String city) {
        this.name = name;
        this.city = city;
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

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
