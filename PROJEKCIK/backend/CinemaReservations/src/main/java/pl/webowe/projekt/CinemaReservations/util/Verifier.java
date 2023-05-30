package pl.webowe.projekt.CinemaReservations.util;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Collections;

public class Verifier {
    private static final String CLIENT_ID = "188786724390-1sl15llbffbfkpb80ha1q54jjhppro2j.apps.googleusercontent.com";

    public static GoogleIdToken.Payload verify(String token) {
        try {
            HttpTransport transport = new NetHttpTransport();
            JsonFactory jsonFactory = new GsonFactory();
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
                    .setAudience(Collections.singletonList(CLIENT_ID))
                    .build();

            GoogleIdToken idToken = verifier.verify(token);

            if (idToken != null) {
                return idToken.getPayload();
            }
        } catch (IOException e) {
            return null;
        } catch (GeneralSecurityException e) {
            throw new RuntimeException(e);
        }
        return null;
    }
}
