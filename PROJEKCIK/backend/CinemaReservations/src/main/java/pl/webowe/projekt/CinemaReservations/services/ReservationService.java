package pl.webowe.projekt.CinemaReservations.services;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import pl.webowe.projekt.CinemaReservations.exceptions.NotFoundException;
import pl.webowe.projekt.CinemaReservations.models.*;
import pl.webowe.projekt.CinemaReservations.models.Reservation;
import pl.webowe.projekt.CinemaReservations.repositories.ReservationRepository;
import pl.webowe.projekt.CinemaReservations.repositories.ScreeningRepository;
import pl.webowe.projekt.CinemaReservations.repositories.SeatRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    private final ReservationRepository reservationRepository;
    private final ScreeningRepository screeningRepository;
    private final SeatRepository seatRepository;


    public ReservationService(ReservationRepository reservationRepository, SeatRepository seatRepository, ScreeningRepository screeningRepository){
        this.reservationRepository = reservationRepository;
        this.screeningRepository = screeningRepository;
        this.seatRepository = seatRepository;
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation getReservation(long id) {
        return reservationRepository.findById(id).get();
    }

    //chyba nie do końca to jest potrzebne
    public Reservation updateReservation(long id, String clientMail, long seat_id, long screening_id, LocalDateTime dateTime) throws NotFoundException {
        if (reservationRepository.existsById(id)) {
            Reservation reservation = reservationRepository.findBySeatIdAndScreeningId(seat_id, screening_id);
            reservation.setClient_mail(clientMail);
            reservation.setReservation_date(dateTime);
            reservationRepository.saveAndFlush(reservation);
            return reservation;
        } else {
            throw new NotFoundException();
        }
    }

    @Transactional
    public List<Reservation> updateReservations(String clientMail, List<Long> seat_id, long screening_id, LocalDateTime dateTime) throws NotFoundException {

            List<Reservation> reservations = new ArrayList<>();
            LocalDateTime now = LocalDateTime.now();
            for(Long l: seat_id) {
                Reservation reservation = reservationRepository.findBySeatIdAndScreeningId(l, screening_id);
                if (reservation == null){
                    throw new NotFoundException();
                }

                if (clientMail.equals("payment")) {
                    if (reservation.getClient_mail() != null) {
                        if (reservation.getReservation_date() != null && reservation.getReservation_date().isAfter(now))
                            return null;
                    }
                }

                reservation.setClient_mail(clientMail);
                reservation.setReservation_date(dateTime);
                reservationRepository.saveAndFlush(reservation);
                reservations.add(reservation);
            }
            return reservations;

    }


    public Reservation addReservation(String clientMail, long seat_id, long screening_id, LocalDateTime dateTime) throws NotFoundException {
        Reservation newReservation = new Reservation();
        newReservation.setClient_mail(clientMail);
        newReservation.setReservation_date(dateTime);
        Optional<Seat> seat = seatRepository.findById(seat_id);
        Optional<Screening> screening = screeningRepository.findById(screening_id);
        if (seat.isPresent() && screening.isPresent()) {
            newReservation.setScreening(screening.get());
            newReservation.setSeat(seat.get());
            reservationRepository.saveAndFlush(newReservation);
            return newReservation;
        } else {
            throw new NotFoundException();
        }

    }


    public boolean deleteReservation(long id) throws NotFoundException {
        if(reservationRepository.existsById(id)) {
            reservationRepository.deleteById(id);
            return true;

        } else {
            throw new NotFoundException();
        }

    }
}
