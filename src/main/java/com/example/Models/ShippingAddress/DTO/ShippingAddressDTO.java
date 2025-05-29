package com.example.Models.ShippingAddress.DTO;

import jakarta.persistence.*;

@Entity
@Table(name = "shipping_address")
public class ShippingAddressDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private int addressId;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "address", nullable = false)
    private String address;

    @Column(name = "zip_code", nullable = false)
    private String zipCode;

    @Column(name = "city", nullable = false)
    private String city;

    @Column(name = "state", nullable = false)
    private String state;

    @Column(name = "country", nullable = false)
    private String country;

    // Constructor vacío requerido por JPA
    public ShippingAddressDTO() {}

    // Constructor completo usado en el mapper
    public ShippingAddressDTO(
        int addressId,
        String userId,
        String address,
        String zipCode,
        String city,
        String state,
        String country
    ) {
        this.addressId = addressId;
        this.userId = userId;
        this.address = address;
        this.zipCode = zipCode;
        this.city = city;
        this.state = state;
        this.country = country;
    }

    public int getAddressId() {
        return addressId;
    }

    public String getUserId() {
        return userId;
    }

    public String getAddress() {
        return address;
    }

    public String getZipCode() {
        return zipCode;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public String getCountry() {
        return country;
    }
}