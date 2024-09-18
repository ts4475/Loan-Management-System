package com.example.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class LoanTest {

    @InjectMocks
    private Loan loan;

    @BeforeEach
    void setUp() {
        loan = new Loan();
        loan.setCustomerId(1L);
        loan.setLoanManagerId(1L);
        loan.setLoanApplication(1L);
        loan.setStatus(Loan.LoanStatus.active);
        loan.setAmount(new BigDecimal("1000.00"));
        loan.setInterestRate(new BigDecimal("5.00"));
        loan.setRepayableAmount(new BigDecimal("1050.00"));
        loan.setLateFee(new BigDecimal("50.00"));
        loan.setPrePaymentFee(new BigDecimal("20.00"));
        loan.setStartDate(LocalDate.now());
        loan.setEndDate(LocalDate.now().plusYears(1));
        loan.setRepaymentFrequency(Loan.RepaymentFrequency.MONTHLY);
    }

    @Test
    void testLoanFields() {
        assertNotNull(loan);
        assertEquals(1L, loan.getCustomerId());
        assertEquals(1L, loan.getLoanManagerId());
        assertEquals(1L, loan.getLoanApplication());
        assertEquals(Loan.LoanStatus.active, loan.getStatus());
        assertEquals(new BigDecimal("1000.00"), loan.getAmount());
        assertEquals(new BigDecimal("5.00"), loan.getInterestRate());
        assertEquals(new BigDecimal("1050.00"), loan.getRepayableAmount());
        assertEquals(new BigDecimal("50.00"), loan.getLateFee());
        assertEquals(new BigDecimal("20.00"), loan.getPrePaymentFee());
        assertEquals(LocalDate.now(), loan.getStartDate());
        assertEquals(LocalDate.now().plusYears(1), loan.getEndDate());
        assertEquals(Loan.RepaymentFrequency.MONTHLY, loan.getRepaymentFrequency());
    }

    @Test
    void testOnCreate() {
        loan.onCreate();
        assertNotNull(loan.getCreatedAt());
        assertNotNull(loan.getUpdatedAt());
        //assertEquals(loan.getCreatedAt(), loan.getUpdatedAt());
    }

    @Test
    void testOnUpdate() {
        // Call onCreate to initialize createdAt and updatedAt
        loan.onCreate();
        LocalDateTime createdAt = loan.getCreatedAt();
        LocalDateTime initialUpdatedAt = loan.getUpdatedAt();

        // Simulate a delay to ensure updatedAt will be different
        try {
            Thread.sleep(1000); // Sleep for 1 second to simulate delay
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Call onUpdate to update updatedAt
        loan.onUpdate();
        LocalDateTime updatedAt = loan.getUpdatedAt();

        // Assertions
        assertNotNull(updatedAt);
        assertNotEquals(initialUpdatedAt, updatedAt);
        assertEquals(createdAt, loan.getCreatedAt()); // Ensure createdAt remains unchanged
    }


    @Test
    void testSettersAndGetters() {
        loan.setCustomerId(2L);
        assertEquals(2L, loan.getCustomerId());

        loan.setLoanManagerId(2L);
        assertEquals(2L, loan.getLoanManagerId());

        loan.setLoanApplication(2L);
        assertEquals(2L, loan.getLoanApplication());

        loan.setStatus(Loan.LoanStatus.paid_off);
        assertEquals(Loan.LoanStatus.paid_off, loan.getStatus());

        loan.setAmount(new BigDecimal("2000.00"));
        assertEquals(new BigDecimal("2000.00"), loan.getAmount());

        loan.setInterestRate(new BigDecimal("6.00"));
        assertEquals(new BigDecimal("6.00"), loan.getInterestRate());

        loan.setRepayableAmount(new BigDecimal("2100.00"));
        assertEquals(new BigDecimal("2100.00"), loan.getRepayableAmount());

        loan.setLateFee(new BigDecimal("100.00"));
        assertEquals(new BigDecimal("100.00"), loan.getLateFee());

        loan.setPrePaymentFee(new BigDecimal("40.00"));
        assertEquals(new BigDecimal("40.00"), loan.getPrePaymentFee());

        loan.setStartDate(LocalDate.now().plusDays(1));
        assertEquals(LocalDate.now().plusDays(1), loan.getStartDate());

        loan.setEndDate(LocalDate.now().plusYears(2));
        assertEquals(LocalDate.now().plusYears(2), loan.getEndDate());

        loan.setRepaymentFrequency(Loan.RepaymentFrequency.QUARTERLY);
        assertEquals(Loan.RepaymentFrequency.QUARTERLY, loan.getRepaymentFrequency());
    }
}
