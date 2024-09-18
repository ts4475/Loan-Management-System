package com.example.controller;

import com.example.model.Transaction;
import com.example.service.TransactionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TransactionControllerTest {

    @Mock
    private TransactionService transactionService;

    @InjectMocks
    private TransactionController transactionController;

    private Transaction transaction;

    @BeforeEach
    void setUp() {
        transaction = new Transaction();
        transaction.setId(1L);
    }

    @Test
    void testGetTransactionsByLoanId() {
        List<Transaction> transactions = Arrays.asList(transaction);
        when(transactionService.getTransactionsByLoanId(anyLong())).thenReturn(transactions);

        ResponseEntity<List<Transaction>> response = transactionController.getTransactionsByLoanId(1L);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(transactions, response.getBody());
    }

    @Test
    void testCreateTransaction() {
        when(transactionService.recordTransaction(any(Transaction.class))).thenReturn(transaction);

        ResponseEntity<Transaction> response = transactionController.createTransaction(transaction);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(transaction, response.getBody());
    }

    @Test
    void testUpdateTransaction() {
        when(transactionService.updateTransaction(anyLong(), any(Transaction.class))).thenReturn(transaction);

        ResponseEntity<Transaction> response = transactionController.updateTransaction(1L, transaction);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(transaction, response.getBody());
    }

    @Test
    void testDeleteTransaction() {
        doNothing().when(transactionService).deleteTransaction(anyLong());

        ResponseEntity<Void> response = transactionController.deleteTransaction(1L);

        assertNotNull(response);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        assertNull(response.getBody());
    }
}
