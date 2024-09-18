package com.example.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.model.Loan;
import com.example.model.Repayment;
import com.example.model.Transaction;
import com.example.model.TransactionType;
import com.example.repository.LoanRepository;
import com.example.repository.RepaymentRepository;

@ExtendWith(MockitoExtension.class)
public class RepaymentServiceTest {

    @Mock
    private RepaymentRepository repaymentRepository;

    @Mock
    private TransactionService transactionService;

    @Mock
    private LoanRepository loanRepository;

    @InjectMocks
    private RepaymentService repaymentService;

    private Loan loan;
    private Repayment repayment;

    @BeforeEach
    void setUp() {
        loan = new Loan();
        loan.setId(1L);
        loan.setAmount(BigDecimal.valueOf(10000));
        loan.setInterestRate(BigDecimal.valueOf(5));
        loan.setStartDate(LocalDate.now().minusYears(1));
        loan.setEndDate(LocalDate.now().plusYears(4));
        loan.setRepayableAmount(BigDecimal.valueOf(11000));
        loan.setLateFee(BigDecimal.valueOf(100));
        loan.setPrePaymentFee(BigDecimal.valueOf(50));

        repayment = new Repayment();
        repayment.setId(1L);
        repayment.setLoan(loan);
        repayment.setAmount(BigDecimal.valueOf(500));
        repayment.setRepaymentDate(LocalDateTime.now());
    }

    @Test
    void testGetRepaymentsByLoanId() {
        when(repaymentRepository.findByLoanId(1L)).thenReturn(Arrays.asList(repayment));

        assertEquals(1, repaymentService.getRepaymentsByLoanId(1L).size());
    }

    @Test
    void testFindRepaymentById() {
        when(repaymentRepository.findById(1L)).thenReturn(Optional.of(repayment));

        assertNotNull(repaymentService.findRepaymentById(1L));
    }

//    @Test
//    void testCreateRepayment() {
//        when(loanRepository.findByLoanId(1L)).thenReturn(loan);
//        when(repaymentRepository.save(any(Repayment.class))).thenReturn(repayment);
//        
//        Repayment createdRepayment = repaymentService.createRepayment(repayment);
//        
//        assertNotNull(createdRepayment);
//        verify(repaymentRepository, times(1)).save(any(Repayment.class));
//        verify(transactionService, times(1)).recordTransaction(any(Transaction.class));
//    }

    @Test
    void testUpdateRepayment() {
        when(repaymentRepository.findById(1L)).thenReturn(Optional.of(repayment));
        when(repaymentRepository.save(any(Repayment.class))).thenReturn(repayment);

        Repayment updatedRepayment = repaymentService.updateRepayment(1L, repayment);

        assertNotNull(updatedRepayment);
        verify(repaymentRepository, times(1)).save(any(Repayment.class));
        verify(transactionService, times(1)).recordTransaction(any(Transaction.class));
    }

    @Test
    void testDeleteRepayment() {
        when(repaymentRepository.findById(1L)).thenReturn(Optional.of(repayment));

        repaymentService.deleteRepayment(1L);

        verify(repaymentRepository, times(1)).delete(any(Repayment.class));
        verify(transactionService, times(1)).recordTransaction(any(Transaction.class));
    }

//    @Test
//    void testCalculateRepaymentAmount() {
//        when(loanRepository.findByLoanId(1L)).thenReturn(loan);
//        when(repaymentRepository.findByLoanId(1L)).thenReturn(Arrays.asList(repayment));
//
//        //BigDecimal repaymentAmount = repaymentService.calculateRepaymentAmount(1L);
//
//        //assertNotNull(repaymentAmount);
//    }

    @Test
    void testCalculateEMIAmount() {
        when(loanRepository.findByLoanId(1L)).thenReturn(loan);

        BigDecimal emiAmount = repaymentService.calculateEMIAmount(1L);

        assertNotNull(emiAmount);
    }
}
