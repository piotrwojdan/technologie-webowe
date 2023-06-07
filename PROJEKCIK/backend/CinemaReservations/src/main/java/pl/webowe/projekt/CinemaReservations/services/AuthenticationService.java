package pl.webowe.projekt.CinemaReservations.services;


import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import pl.webowe.projekt.CinemaReservations.config.auth.JwtService;
import pl.webowe.projekt.CinemaReservations.controllers.auth.AuthenticationRequest;
import pl.webowe.projekt.CinemaReservations.controllers.auth.AuthenticationResponse;
import pl.webowe.projekt.CinemaReservations.models.Admin;
import pl.webowe.projekt.CinemaReservations.repositories.AdminRepository;


import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final AdminRepository repository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = repository.findByUsername(request.getEmail()).orElseThrow();

        var jwtToken = jwtService.generateToken(user);


        long expiresInMillis = jwtService.extractExpiration(jwtToken).getTime() - (new Date()).getTime();
        long expiresInSecs = expiresInMillis / 1000;

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .expiresIn(expiresInSecs)
                .build();
    }

    public Admin getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (Admin) authentication.getPrincipal();
    }

}
