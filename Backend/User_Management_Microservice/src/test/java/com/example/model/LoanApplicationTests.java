package com.example.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class LoanApplicationTests {

    private LoanApplication loanApplication;

    @BeforeEach
    public void setUp() {
        loanApplication = new LoanApplication(1L, 5000, 12, LocalDateTime.now(), LocalDateTime.now(),
                "Review message", LoanApplication.Status.Application_Submitted, new Users(), new LoanProducts(),
                new Vendors());
    }

    @Test
    public void testLoanApplicationAttributes() {
        assertEquals(1L, loanApplication.getApplication_id());
        assertEquals(5000, loanApplication.getAmount_required());
        assertEquals(12, loanApplication.getTenure());
        assertNotNull(loanApplication.getCreated_at());
        assertNotNull(loanApplication.getUpdated_at());
        assertEquals("Review message", loanApplication.getReview_message());
        assertEquals(LoanApplication.Status.Application_Submitted, loanApplication.getStatus());
        assertNotNull(loanApplication.getUser());
        assertNotNull(loanApplication.getProduct());
        assertNotNull(loanApplication.getVendor());
    }

    @Test
    public void testLoanApplicationTimestamps() {
        loanApplication.onCreate();
        assertNotNull(loanApplication.getCreated_at());

        loanApplication.onUpdate();
        assertNotNull(loanApplication.getUpdated_at());
    }

    @Test
    public void testSetters() {
        loanApplication.setAmount_required(10000);
        assertEquals(10000, loanApplication.getAmount_required());

        loanApplication.setTenure(24);
        assertEquals(24, loanApplication.getTenure());

        LocalDateTime newTime = LocalDateTime.now();
        loanApplication.setCreated_at(newTime);
        assertEquals(newTime, loanApplication.getCreated_at());

        loanApplication.setUpdated_at(newTime);
        assertEquals(newTime, loanApplication.getUpdated_at());

        loanApplication.setReview_message("New review message");
        assertEquals("New review message", loanApplication.getReview_message());

        loanApplication.setStatus(LoanApplication.Status.Loan_Approved);
        assertEquals(LoanApplication.Status.Loan_Approved, loanApplication.getStatus());

        Users newUser = new Users();
        loanApplication.setUser(newUser);
        assertEquals(newUser, loanApplication.getUser());

        LoanProducts newProduct = new LoanProducts();
        loanApplication.setProduct(newProduct);
        assertEquals(newProduct, loanApplication.getProduct());

        Vendors newVendor = new Vendors();
        loanApplication.setVendor(newVendor);
        assertEquals(newVendor, loanApplication.getVendor());
    }
}
