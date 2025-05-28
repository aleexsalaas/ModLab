package com.example.Models.User.DTO;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "\"user\"")
public class UserDTO {

    @Id
    @Column(name = "userId")
    private String userId;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password_hash", nullable = false)
    private String passwordHash;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "phone", nullable = false)
    private String phone;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "role", nullable = false)
    private boolean role;

    public UserDTO() {}

    @JsonCreator
    public UserDTO(
        @JsonProperty("userId") String userId,
        @JsonProperty("firstName") String firstName,
        @JsonProperty("lastName") String lastName,
        @JsonProperty("username") String username,
        @JsonProperty("passwordHash") String passwordHash,
        @JsonProperty("email") String email,
        @JsonProperty("phone") String phone,
        @JsonProperty("createdAt") LocalDateTime createdAt,
        @JsonProperty("role") boolean role
    ) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.passwordHash = passwordHash;
        this.email = email;
        this.phone = phone;
        this.createdAt = createdAt != null ? createdAt : LocalDateTime.now();
        this.role = role;
    }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPasswordHash() { return passwordHash; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getCreatedAt() {
        return createdAt != null
            ? createdAt.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
            : null;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public boolean getRole() {
        return role;
    }

    @Override
    public String toString() {
        return "UserDTO [userId=" + userId + ", firstName=" + firstName + ", lastName=" + lastName +
                ", username=" + username + ", passwordHash=" + passwordHash + ", email=" + email +
                ", phone=" + phone + ", createdAt=" + getCreatedAt() + ", role=" + role + "]";
    }
}