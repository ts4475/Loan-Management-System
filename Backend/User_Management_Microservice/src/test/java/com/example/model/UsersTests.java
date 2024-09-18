package com.example.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

public class UsersTests {

    private Users user;
    private Set<LoanApplication> loanApplications;

    @BeforeEach
    public void setUp() {
        loanApplications = new HashSet<>();
        user = new Users(1L, "test@example.com", "password", "John", "Doe", "1234567890", "123 Main St",
                "123456", Users.SecurityQuestion.FIRST_SCHOOL, "Test School", "ABCDE1234F", LocalDate.of(1990, 1, 1),
                100000, Users.RoleEnum.CUSTOMER, LocalDateTime.now(), LocalDateTime.now(), loanApplications);
    }

    @Test
    public void testUserAttributes() {
        assertEquals(1L, user.getUser_id());
        assertEquals("test@example.com", user.getEmail());
        assertEquals("password", user.getPassword());
        assertEquals("John", user.getFirst_name());
        assertEquals("Doe", user.getLast_name());
        assertEquals("1234567890", user.getPhone());
        assertEquals("123 Main St", user.getAddress());
        assertEquals("123456", user.getPin());
        assertEquals(Users.SecurityQuestion.FIRST_SCHOOL, user.getSecurityQuestion());
        assertEquals("Test School", user.getSecurityAnswer());
        assertEquals("ABCDE1234F", user.getPan());
        assertEquals(LocalDate.of(1990, 1, 1), user.getDob());
        assertEquals(100000, user.getAnnualIncome());
        assertEquals(Users.RoleEnum.CUSTOMER, user.getRole());
        assertNotNull(user.getLoanApplications());
    }

    @Test
    public void testUserTimestamps() {
        user.onCreate();
        assertNotNull(user.getCreatedAt());

        user.onUpdate();
        assertNotNull(user.getUpdatedAt());
    }

    @Test
    public void testSetters() {
        user.setEmail("new@example.com");
        assertEquals("new@example.com", user.getEmail());

        user.setPassword("newpassword");
        assertEquals("newpassword", user.getPassword());

        user.setFirst_name("Jane");
        assertEquals("Jane", user.getFirst_name());

        user.setLast_name("Smith");
        assertEquals("Smith", user.getLast_name());

        user.setPhone("0987654321");
        assertEquals("0987654321", user.getPhone());

        user.setAddress("456 Another St");
        assertEquals("456 Another St", user.getAddress());

        user.setPin("654321");
        assertEquals("654321", user.getPin());

        user.setSecurityQuestion(Users.SecurityQuestion.FAVOURITE_FOOD);
        assertEquals(Users.SecurityQuestion.FAVOURITE_FOOD, user.getSecurityQuestion());

        user.setSecurityAnswer("Pizza");
        assertEquals("Pizza", user.getSecurityAnswer());

        user.setPan("XYZ9876543");
        assertEquals("XYZ9876543", user.getPan());

        user.setDob(LocalDate.of(1985, 5, 5));
        assertEquals(LocalDate.of(1985, 5, 5), user.getDob());

        user.setAnnualIncome(200000);
        assertEquals(200000, user.getAnnualIncome());

        user.setRole(Users.RoleEnum.ADMIN);
        assertEquals(Users.RoleEnum.ADMIN, user.getRole());

        Set<LoanApplication> newLoanApplications = new HashSet<>();
        user.setLoanApplications(newLoanApplications);
        assertEquals(newLoanApplications, user.getLoanApplications());
    }
}
