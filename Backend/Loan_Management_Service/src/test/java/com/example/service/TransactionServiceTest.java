package com.example.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.exception.TransactionNotFoundException;
import com.example.model.Loan;
import com.example.model.Transaction;
import com.example.model.TransactionType;
import com.example.repository.TransactionRepository;

@ExtendWith(MockitoExtension.class)
public class TransactionServiceTest {

    @Mock
    private TransactionRepository transactionRepository;

    @InjectMocks
    private TransactionService transactionService;

    private Transaction transaction;

    @BeforeEach
    void setUp() {
        transaction = new Transaction();
        transaction.setId(1L);
        transaction.setTransactionDate(LocalDateTime.now());
        transaction.setAmount(BigDecimal.valueOf(1000));
        transaction.setType(TransactionType.REPAYMENT);

        Loan loan = new Loan();
        loan.setId(1L);
        transaction.setLoan(loan);
    }

    @Test
    void testGetTransactionsByLoanId() {
        when(transactionRepository.findByLoanId(1L)).thenReturn(Arrays.asList(transaction));

        assertEquals(1, transactionService.getTransactionsByLoanId(1L).size());
    }

    @Test
    void testRecordTransaction() {
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);

        Transaction createdTransaction = transactionService.recordTransaction(transaction);

        assertNotNull(createdTransaction);
        assertEquals(transaction.getId(), createdTransaction.getId());
        verify(transactionRepository, times(1)).save(any(Transaction.class));
    }

    @Test
    void testUpdateTransaction() {
        when(transactionRepository.findById(1L)).thenReturn(Optional.of(transaction));
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);

        Transaction transactionDetails = new Transaction();
        transactionDetails.setTransactionDate(LocalDateTime.now().plusDays(1));
        transactionDetails.setAmount(BigDecimal.valueOf(2000));
        transactionDetails.setType(TransactionType.REPAYMENT);

        Transaction updatedTransaction = transactionService.updateTransaction(1L, transactionDetails);

        assertNotNull(updatedTransaction);
        assertEquals(transactionDetails.getAmount(), updatedTransaction.getAmount());
        verify(transactionRepository, times(1)).save(any(Transaction.class));
    }

    @Test
    void testUpdateTransaction_NotFound() {
        when(transactionRepository.findById(1L)).thenReturn(Optional.empty());

        Transaction transactionDetails = new Transaction();
        transactionDetails.setTransactionDate(LocalDateTime.now().plusDays(1));
        transactionDetails.setAmount(BigDecimal.valueOf(2000));
        transactionDetails.setType(TransactionType.REPAYMENT);

        assertThrows(TransactionNotFoundException.class, () -> {
            transactionService.updateTransaction(1L, transactionDetails);
        });

        verify(transactionRepository, times(0)).save(any(Transaction.class));
    }

    @Test
    void testDeleteTransaction() {
        when(transactionRepository.findById(1L)).thenReturn(Optional.of(transaction));

        transactionService.deleteTransaction(1L);

        verify(transactionRepository, times(1)).delete(any(Transaction.class));
    }

    @Test
    void testDeleteTransaction_NotFound() {
        when(transactionRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(TransactionNotFoundException.class, () -> {
            transactionService.deleteTransaction(1L);
        });

        verify(transactionRepository, times(0)).delete(any(Transaction.class));
    }
}
