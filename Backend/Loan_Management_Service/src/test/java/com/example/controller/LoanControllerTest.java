package com.example.controller;

import com.example.exception.InvalidLoanApplicationException;
import com.example.exception.LoanNotFoundException;
import com.example.model.Loan;
import com.example.service.LoanService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

public class LoanControllerTest {

    @Mock
    private LoanService loanService;

    @InjectMocks
    private LoanController loanController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateLoan() throws InvalidLoanApplicationException {
        Loan loan = new Loan();
        when(loanService.createLoan(anyLong())).thenReturn(loan);

        ResponseEntity<Loan> response = loanController.createLoan(1L);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(loan, response.getBody());
        verify(loanService, times(1)).createLoan(1L);
    }

    @Test
    public void testCreateLoan_InvalidLoanApplicationException() throws InvalidLoanApplicationException {
        when(loanService.createLoan(anyLong())).thenThrow(new InvalidLoanApplicationException("Invalid loan application"));

        ResponseEntity<Loan> response = loanController.createLoan(1L);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals(null, response.getBody());
        verify(loanService, times(1)).createLoan(1L);
    }

    @Test
    public void testUpdateLoan() throws LoanNotFoundException {
        Loan loan = new Loan();
        when(loanService.updateLoan(anyLong(), any(Loan.class))).thenReturn(loan);

        ResponseEntity<Loan> response = loanController.updateLoan(1L, loan);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(loan, response.getBody());
        verify(loanService, times(1)).updateLoan(1L, loan);
    }

    @Test
    public void testUpdateLoan_LoanNotFoundException() throws LoanNotFoundException {
        when(loanService.updateLoan(anyLong(), any(Loan.class))).thenThrow(new LoanNotFoundException("Loan not found"));

        Loan loan = new Loan();
        ResponseEntity<Loan> response = loanController.updateLoan(1L, loan);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals(null, response.getBody());
        verify(loanService, times(1)).updateLoan(1L, loan);
    }

    @Test
    public void testGetLoanById() throws LoanNotFoundException {
        Loan loan = new Loan();
        when(loanService.getLoanById(anyLong())).thenReturn(loan);

        ResponseEntity<Loan> response = loanController.getLoanById(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(loan, response.getBody());
        verify(loanService, times(1)).getLoanById(1L);
    }

    @Test
    public void testGetLoanById_LoanNotFoundException() throws LoanNotFoundException {
        when(loanService.getLoanById(anyLong())).thenThrow(new LoanNotFoundException("Loan not found"));

        ResponseEntity<Loan> response = loanController.getLoanById(1L);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals(null, response.getBody());
        verify(loanService, times(1)).getLoanById(1L);
    }

    @Test
    public void testGetLoansByCustomerId() {
        List<Loan> loans = new ArrayList<>();
        when(loanService.getLoansByCustomerId(anyLong())).thenReturn(loans);

        ResponseEntity<List<Loan>> response = loanController.getLoansByCustomerId(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(loans, response.getBody());
        verify(loanService, times(1)).getLoansByCustomerId(1L);
    }

    @Test
    public void testGetAllLoans() {
        List<Loan> loans = new ArrayList<>();
        when(loanService.getAllLoans()).thenReturn(loans);

        ResponseEntity<List<Loan>> response = loanController.getAllLoans();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(loans, response.getBody());
        verify(loanService, times(1)).getAllLoans();
    }

    @Test
    public void testDeleteLoanById() {
        doNothing().when(loanService).deleteLoanById(anyLong());

        ResponseEntity<Void> response = loanController.deleteLoanById(1L);

        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(loanService, times(1)).deleteLoanById(1L);
    }
}
