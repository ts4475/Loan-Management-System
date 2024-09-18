package com.example.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RepaymentTest {

    @InjectMocks
    private Repayment repayment;

    @Mock
    private Loan loan;

    @BeforeEach
    void setUp() {
        repayment.setId(1L);
        repayment.setLoan(loan);
        repayment.setAmount(new BigDecimal("1000.00"));
        repayment.setRepaymentDate(LocalDateTime.now().minusDays(1));
        repayment.setStatus(Repayment.RepaymentStatus.COMPLETED);
    }

    @Test
    void gettersAndSetters_ValidData_Success() {
        assertEquals(1L, repayment.getId());
        assertEquals(loan, repayment.getLoan());
        assertEquals(new BigDecimal("1000.00"), repayment.getAmount());
        assertNotNull(repayment.getRepaymentDate());
        assertEquals(Repayment.RepaymentStatus.COMPLETED, repayment.getStatus());
    }

    

    @Test
    void toString_ValidObject_NonEmptyString() {
        assertNotNull(repayment.toString());
        assertTrue(repayment.toString().contains("Repayment"));
    }

    @Test
    void setStatus_ValidStatus_Success() {
        repayment.setStatus(Repayment.RepaymentStatus.PENDING);
        assertEquals(Repayment.RepaymentStatus.PENDING, repayment.getStatus());
    }

   

    @Test
    void setLoan_ValidLoan_Success() {
        Loan newLoan = mock(Loan.class);
        repayment.setLoan(newLoan);
        assertEquals(newLoan, repayment.getLoan());
    }
}
