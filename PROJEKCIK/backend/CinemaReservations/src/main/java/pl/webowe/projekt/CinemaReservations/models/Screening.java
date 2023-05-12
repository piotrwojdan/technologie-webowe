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

    @Column(name = "movie_id", nullable = false)
    private long movie_id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private Room room;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Reservation> reservations = new ArrayList<>();

    public Screening(){

    }

    public Screening(LocalDateTime time, long movie_id, Room room){
        this.time = time;
        this.movie_id = movie_id;
        this.room = room;

    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setMovie_id(long movie_id) {
        this.movie_id = movie_id;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public void setTime(LocalDateTime time) {
        this.time = time;
    }
}
