package pl.webowe.projekt.CinemaReservations.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import pl.webowe.projekt.CinemaReservations.models.Admin;
import pl.webowe.projekt.CinemaReservations.repositories.AdminRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final PasswordEncoder passwordEncoder;
    private final AdminRepository repository;
    public void updatePassword(Admin user, String password) {
        user.setPassword(password);
        repository.save(user);
    }

    public void processOAuthPostLogin(OAuth2User user) {
        Optional<Admin> existUser = repository.findByUsername(user.getAttribute("email"));

        if (existUser.isEmpty()) {
            var newUser = Admin.builder()
                    .username(user.getAttribute("email"))
                    .password(passwordEncoder.encode((user.getAttribute("sub"))))
                    .build();
            repository.save(newUser);
        }
    }
}
