package pl.webowe.projekt.CinemaReservations.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Admins")
public class Admin {
    @Id
    @GeneratedValue
    private int id;
    @Column(name = "username", nullable = false)
    private String username;
    @Column(name = "password", nullable = false)
    private String password;

    public Admin(){

    }

    public Admin(String username, String password){
        this.username = username;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public String getUsername(){
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
