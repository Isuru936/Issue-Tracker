package com.issue_tracker.issur_tracker.model;

import jakarta.persistence.*;

@Entity
@Table
public class Handler {
    @Id
    @SequenceGenerator(name = "Handler_sequence", allocationSize = 1, sequenceName = "Handler_sequence")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Handler_sequence")

    private Long id;
    private String name;
    private String email;
    private String password;
    private String expertise;
    private String profilePic;


    public Handler(){

    }

    public Handler(Long id, String name, String email, String password, String expertise, String profilePic) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.expertise = expertise;
        this.profilePic = profilePic;
    }


    public Handler(String name, String email, String password, String expertise, String profilePic) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.expertise = expertise;
        this.profilePic = profilePic;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getExpertise() {
        return expertise;
    }

    public void setExpertise(String expertise) {
        this.expertise = expertise;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getprofilePic() {
        return profilePic;
    }

    public void setprofilePicL(String profilePic) {
        this.profilePic = profilePic;
    }

    @Override
    public String toString() {
        return "Handler{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", expertise='" + expertise + '\'' +
                ", profilePic='" + profilePic + '\'' +
                '}';
    }
}
