package pl.webowe.projekt.CinemaReservations.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Reservations")
public class Reservation {
    @Id
    @GeneratedValue
    private long id;
    @Column(name = "client_mail")
    private String client_mail;

    @ManyToOne
    @JoinColumn(name = "seat_id")
    private Seat seat;
    @ManyToOne
    @JoinColumn(name = "screening_id")
    private Screening screening;

    public Reservation() {
    }

    public Reservation(long id, String client_mail, Seat seat, Screening screening) {
        this.id = id;
        this.client_mail = client_mail;
        this.seat = seat;
        this.screening = screening;
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
}
