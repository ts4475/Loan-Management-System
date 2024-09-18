package com.example.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class UserDTOTest {

    @Test
    public void testDefaultConstructor() {
        UserDTO user = new UserDTO();

        assertNotNull(user);
    }

    @Test
    public void testParameterizedConstructor() {
        long userId = 1L;
        String email = "user@example.com";
        String password = "password123";
        String firstName = "John";
        String lastName = "Doe";
        String phone = "1234567890";
        String address = "123 Main St";
        String pin = "123456";
        String securityQuestion = "What is your pet's name?";
        String securityAnswer = "Fluffy";
        String pan = "ABCDE1234F";
        String dob = "1990-01-01";
        int annualIncome = 50000;
        String role = "USER";
        String createdAt = "2023-06-21T10:15:30";
        String updatedAt = "2024-06-21T10:15:30";

        UserDTO user = new UserDTO(userId, email, password, firstName, lastName, phone, address, pin, securityQuestion, securityAnswer, pan, dob, annualIncome, role, createdAt, updatedAt);

        assertEquals(userId, user.getUserId());
        assertEquals(email, user.getEmail());
        assertEquals(password, user.getPassword());
        assertEquals(firstName, user.getFirstName());
        assertEquals(lastName, user.getLastName());
        assertEquals(phone, user.getPhone());
        assertEquals(address, user.getAddress());
        assertEquals(pin, user.getPin());
        assertEquals(securityQuestion, user.getSecurityQuestion());
        assertEquals(securityAnswer, user.getSecurityAnswer());
        assertEquals(pan, user.getPan());
        assertEquals(dob, user.getDob());
        assertEquals(annualIncome, user.getAnnualIncome());
        assertEquals(role, user.getRole());
        assertEquals(createdAt, user.getCreatedAt());
        assertEquals(updatedAt, user.getUpdatedAt());
    }

    @Test
    public void testSettersAndGetters() {
        UserDTO user = new UserDTO();

        long userId = 1L;
        String email = "user@example.com";
        String password = "password123";
        String firstName = "John";
        String lastName = "Doe";
        String phone = "1234567890";
        String address = "123 Main St";
        String pin = "123456";
        String securityQuestion = "What is your pet's name?";
        String securityAnswer = "Fluffy";
        String pan = "ABCDE1234F";
        String dob = "1990-01-01";
        int annualIncome = 50000;
        String role = "USER";
        String createdAt = "2023-06-21T10:15:30";
        String updatedAt = "2024-06-21T10:15:30";

        user.setUserId(userId);
        user.setEmail(email);
        user.setPassword(password);
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setPhone(phone);
        user.setAddress(address);
        user.setPin(pin);
        user.setSecurityQuestion(securityQuestion);
        user.setSecurityAnswer(securityAnswer);
        user.setPan(pan);
        user.setDob(dob);
        user.setAnnualIncome(annualIncome);
        user.setRole(role);
        user.setCreatedAt(createdAt);
        user.setUpdatedAt(updatedAt);

        assertEquals(userId, user.getUserId());
        assertEquals(email, user.getEmail());
        assertEquals(password, user.getPassword());
        assertEquals(firstName, user.getFirstName());
        assertEquals(lastName, user.getLastName());
        assertEquals(phone, user.getPhone());
        assertEquals(address, user.getAddress());
        assertEquals(pin, user.getPin());
        assertEquals(securityQuestion, user.getSecurityQuestion());
        assertEquals(securityAnswer, user.getSecurityAnswer());
        assertEquals(pan, user.getPan());
        assertEquals(dob, user.getDob());
        assertEquals(annualIncome, user.getAnnualIncome());
        assertEquals(role, user.getRole());
        assertEquals(createdAt, user.getCreatedAt());
        assertEquals(updatedAt, user.getUpdatedAt());
    }
}
