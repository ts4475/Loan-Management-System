package com.example.dto;

import com.example.model.Repayment.RepaymentStatus;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class RepaymentRequestDTOTest {

    @Test
    public void testDefaultConstructor() {
        RepaymentRequestDTO repaymentRequest = new RepaymentRequestDTO();

        assertNotNull(repaymentRequest);
    }

    @Test
    public void testParameterizedConstructor() {
        Long loanId = 1L;
        BigDecimal amount = BigDecimal.valueOf(1000.00);
        LocalDateTime repaymentDate = LocalDateTime.now();
        RepaymentStatus status = RepaymentStatus.COMPLETED;

        RepaymentRequestDTO repaymentRequest = new RepaymentRequestDTO(loanId, amount, repaymentDate, status);

        assertEquals(loanId, repaymentRequest.getLoanId());
        assertEquals(amount, repaymentRequest.getAmount());
        assertEquals(repaymentDate, repaymentRequest.getRepaymentDate());
        assertEquals(status, repaymentRequest.getStatus());
    }

    @Test
    public void testSettersAndGetters() {
        RepaymentRequestDTO repaymentRequest = new RepaymentRequestDTO();

        Long loanId = 1L;
        BigDecimal amount = BigDecimal.valueOf(1000.00);
        LocalDateTime repaymentDate = LocalDateTime.now();
        RepaymentStatus status = RepaymentStatus.COMPLETED;

        repaymentRequest.setLoanId(loanId);
        repaymentRequest.setAmount(amount);
        repaymentRequest.setRepaymentDate(repaymentDate);
        repaymentRequest.setStatus(status);

        assertEquals(loanId, repaymentRequest.getLoanId());
        assertEquals(amount, repaymentRequest.getAmount());
        assertEquals(repaymentDate, repaymentRequest.getRepaymentDate());
        assertEquals(status, repaymentRequest.getStatus());
    }
}
