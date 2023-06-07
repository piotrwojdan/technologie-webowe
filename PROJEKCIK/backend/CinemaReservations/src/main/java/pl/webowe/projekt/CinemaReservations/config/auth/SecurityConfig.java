package pl.webowe.projekt.CinemaReservations.config.auth;



import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.web.SecurityFilterChain;


import java.io.IOException;
import java.security.interfaces.RSAPublicKey;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Value("${security.oauth2.resource.jwk.key-set-uri}")
    private String uri;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors().and()
                .csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers("/screenings")
                .authenticated()

                .anyRequest()
                .permitAll()

                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .oauth2ResourceServer().jwt().decoder(jwtDecoder());
                http
                .oauth2Login() //http://localhost:8000/api/oauth2/authorization/google
                .userInfoEndpoint()
                .userService(new DefaultOAuth2UserService());


//                .and()
//                .successHandler(new AuthenticationSuccessHandler() {
//                    @Override
//                    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//                        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
//                        userService.processOAuthPostLogin(oAuth2User);
//
//                        AuthenticationResponse token = authenticationService.authenticate(new AuthenticationRequest(oAuth2User.getAttribute("email"), oAuth2User.getAttribute("sub")));
//
//                        response.sendRedirect("http://localhost:3000/login?t=" + token.getToken() + "&e=" + token.getExpiresIn());
//
//                    }
//                });


        return http.build();
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withJwkSetUri(uri).build();
    }

    public OAuth2TokenValidator<Jwt> tokenValidator() {
        final List<OAuth2TokenValidator<Jwt>> validators =
                List.of(new JwtTimestampValidator(),
                        new JwtIssuerValidator("http://foobar.com"));
        return new DelegatingOAuth2TokenValidator<>(validators);
    }
}
