package com.example.Models.PaymentMethod.DTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "payment_method")
public class PaymentMethodDTO {

    @Id
    @Column(name = "paymentId", nullable = false, unique = true, length = 32)
    private String paymentId;

    @Column(name = "paymentMethod", nullable = false, length = 30)
    private String paymentMethod;

    @Column(name = "cardNumber", nullable = false, length = 19)
    private String cardNumber;

    @Column(name = "cardExpiry", nullable = false)
    private String cardExpiry;

    @Column(name = "cardCvv", nullable = false, length = 4)
    private String cardCvv;

    @Column(name = "userId", nullable = false, length = 32)
    private String userId;

    @Column(name = "cardHolder", nullable = false, length = 100) // nuevo atributo
    private String cardHolder;

    public PaymentMethodDTO() {}

    public PaymentMethodDTO(String paymentId, String paymentMethod, String cardNumber,
                            String cardExpiry, String cardCvv, String userId, String cardHolder) {
        this.paymentId = paymentId;
        this.paymentMethod = paymentMethod;
        this.cardNumber = cardNumber;
        this.cardExpiry = cardExpiry;
        this.cardCvv = cardCvv;
        this.userId = userId;
        this.cardHolder = cardHolder;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getCardExpiry() {
        return cardExpiry;
    }

    public void setCardExpiry(String cardExpiry) {
        this.cardExpiry = cardExpiry;
    }

    public String getCardCvv() {
        return cardCvv;
    }

    public void setCardCvv(String cardCvv) {
        this.cardCvv = cardCvv;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCardHolder() {
        return cardHolder;
    }

    public void setCardHolder(String cardHolder) {
        this.cardHolder = cardHolder;
    }
}
