package com.example.model;

import static org.mockito.Mockito.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

public class TransactionTest {

    @Test
    public void testTransactionCreation() {
        // Create a mock loan object
        Loan mockLoan = Mockito.mock(Loan.class);

        // Create a transaction object
        Transaction transaction = new Transaction();
        transaction.setId(1L);
        transaction.setLoan(mockLoan);
        transaction.setAmount(new BigDecimal("100.00"));
        transaction.setType(TransactionType.DISBURSEMENT);
        transaction.setTransactionDate(LocalDateTime.now());

        // Verify the transaction object
        assert transaction.getId() == 1L;
        assert transaction.getLoan() == mockLoan;
        assert transaction.getAmount().compareTo(new BigDecimal("100.00")) == 0;
        assert transaction.getType() == TransactionType.DISBURSEMENT;
        assert transaction.getTransactionDate().isBefore(LocalDateTime.now().plusSeconds(1));
    }

    @Test
    public void testTransactionAmount() {
        // Create a mock loan object
        Loan mockLoan = Mockito.mock(Loan.class);

        // Create a transaction object with a valid amount
        Transaction transaction = new Transaction();
        transaction.setLoan(mockLoan);
        transaction.setAmount(new BigDecimal("100.00"));
        transaction.setType(TransactionType.REPAYMENT);
        transaction.setTransactionDate(LocalDateTime.now());

        // Verify the amount
        assert transaction.getAmount().compareTo(BigDecimal.ZERO) > 0;

        // Set an invalid amount and verify (assuming a business logic method that should handle this)
        // Since the class itself does not have such a method, this is just an illustrative example.
        transaction.setAmount(new BigDecimal("-50.00"));
        assert transaction.getAmount().compareTo(BigDecimal.ZERO) < 0;
    }

    @Test
    public void testTransactionType() {
        // Create a mock loan object
        Loan mockLoan = Mockito.mock(Loan.class);

        // Create a transaction object with a valid type
        Transaction transaction = new Transaction();
        transaction.setLoan(mockLoan);
        transaction.setAmount(new BigDecimal("100.00"));
        transaction.setType(TransactionType.DISBURSEMENT);
        transaction.setTransactionDate(LocalDateTime.now());

        // Verify the type
        assert transaction.getType() == TransactionType.DISBURSEMENT;

        // Change the type and verify
        transaction.setType(TransactionType.REPAYMENT);
        assert transaction.getType() == TransactionType.REPAYMENT;
    }

    @Test
    public void testTransactionDate() {
        // Create a mock loan object
        Loan mockLoan = Mockito.mock(Loan.class);

        // Create a transaction object with a valid date
        Transaction transaction = new Transaction();
        transaction.setLoan(mockLoan);
        transaction.setAmount(new BigDecimal("100.00"));
        transaction.setType(TransactionType.DISBURSEMENT);
        transaction.setTransactionDate(LocalDateTime.now());

        // Verify the date is not null and is in the past or present
        assert transaction.getTransactionDate() != null;
        assert transaction.getTransactionDate().isBefore(LocalDateTime.now().plusSeconds(1));
    }
}
