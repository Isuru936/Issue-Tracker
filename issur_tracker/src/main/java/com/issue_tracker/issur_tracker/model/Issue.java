package com.issue_tracker.issur_tracker.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;

//to add values to the table we use
@Entity
@Table
public class Issue {
    @Id
    @SequenceGenerator(name = "Issue_sequence", allocationSize = 1, sequenceName = "Issue_sequence")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "Issue_sequence")
    private Long id;
    private String email;
    private String subject;
    private String description;
    private String technician;
    private String imageURL;
    private LocalDateTime issueCreated;
    private LocalDateTime issueAssigned;

    private int status;

    public Issue() {
    }

    public Issue(String email, String subject, String description, String technician, LocalDateTime issueCreated, LocalDateTime issueAssigned, int status) {
        this.email = email;
        this.subject = subject;
        this.description = description;
        this.technician = technician;
        this.issueCreated = issueCreated;
        this.issueAssigned = issueAssigned;
        this.status = status;
    }

    public Issue(String email, String subject, String description, String technician, String imageURL, LocalDateTime issueCreated, LocalDateTime issueAssigned, int status) {
        this.email = email;
        this.subject = subject;
        this.description = description;
        this.technician = technician;
        this.imageURL = imageURL;
        this.issueCreated = issueCreated;
        this.issueAssigned = issueAssigned;
        this.status = status;
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

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getIssueCreated() {
        return issueCreated;
    }

    public void setIssueCreated(LocalDateTime issueCreated) {
        this.issueCreated = issueCreated;
    }

    public LocalDateTime getIssueAssigned() {
        return issueAssigned;
    }

    public void setIssueAssigned(LocalDateTime issueAssigned) {
        this.issueAssigned = issueAssigned;
    }

    public String getTechnician() {
        return technician;
    }

    public void setTechnician(String technician) {
        this.technician = technician;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    @Override
    public String toString() {
        return "Issue{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", subject='" + subject + '\'' +
                ", description='" + description + '\'' +
                ", technician='" + technician + '\'' +
                ", imageURL=" + imageURL +
                ", issueCreated=" + issueCreated +
                ", issueAssigned=" + issueAssigned +
                ", status=" + status +
                '}';
    }
}
