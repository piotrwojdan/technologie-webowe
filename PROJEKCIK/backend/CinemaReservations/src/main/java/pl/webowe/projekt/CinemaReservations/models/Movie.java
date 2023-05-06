package pl.webowe.projekt.CinemaReservations.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Movies")
public class Movie {
    @Id
    @GeneratedValue
    private long id;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "description", nullable = false)
    private String description;
    @Column(name = "runtime", nullable = false)
    private int runtime;
    @Column(name = "vote_average", nullable = false)
    private double vote_averege;

    @ManyToMany(mappedBy = "movies")
    private List<Genre> genres = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "movie_id")
    private List<Screening> screenings = new ArrayList<>();

    public Movie(){

    }

    public Movie(String name, String description, int runtime, double vote_averege){
        this.name = name;
        this.description = description;
        this.runtime = runtime;
        this.vote_averege = vote_averege;
    }

    public long getId() {
        return id;
    }

    public double getVote_averege() {
        return vote_averege;
    }

    public int getRuntime() {
        return runtime;
    }

    public List<Genre> getGenres() {
        return genres;
    }

    public void setRuntime(int runtime) {
        this.runtime = runtime;
    }

    public void setVote_averege(double vote_averege) {
        this.vote_averege = vote_averege;
    }

    public String getDescription() {
        return description;
    }

    public String getName() {
        return name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setName(String name) {
        this.name = name;
    }
}
