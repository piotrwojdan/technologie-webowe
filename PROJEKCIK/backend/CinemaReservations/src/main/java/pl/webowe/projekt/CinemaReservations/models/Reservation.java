package pl.webowe.projekt.CinemaReservations.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "Reservations")
public class Reservation {
    @Id
    @GeneratedValue
    private long id;
    @Column(name = "client_mail")
    private String client_mail;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "seat_id")
    private Seat seat;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "screening_id")
    private Screening screening;

    @Column(name = "reservation_date")
    private LocalDateTime reservation_date;

    public Reservation() {
    }

    public Reservation(long id, String client_mail, Seat seat, Screening screening, LocalDateTime dateTime) {
        this.id = id;
        this.client_mail = client_mail;
        this.seat = seat;
        this.screening = screening;
        this.reservation_date = dateTime;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getClient_mail() {
        return client_mail;
    }

    public void setClient_mail(String client_mail) {
        this.client_mail = client_mail;
    }

    public Seat getSeat() {
        return seat;
    }

    public void setSeat(Seat seat) {
        this.seat = seat;
    }

    public Screening getScreening() {
        return screening;
    }

    public void setScreening(Screening screening) {
        this.screening = screening;
    }

    public LocalDateTime getReservation_date() {
        return reservation_date;
    }

    public void setReservation_date(LocalDateTime reservation_date) {
        this.reservation_date = reservation_date;
    }
}
