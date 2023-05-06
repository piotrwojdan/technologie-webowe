package pl.webowe.projekt.CinemaReservations.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "screenings")
public class Screening {
    @Id
    @GeneratedValue
    private long id;
    @Column(name = "time", nullable = false)
    private LocalDateTime time;

    @JoinColumn(name = "movie_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY)
    private Movie movie;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room rooms;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Reservation> reservations = new ArrayList<>();

    public Screening(){

    }



}
