package com.example.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

import com.example.model.Repayment;
import com.example.service.RepaymentService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@ExtendWith(MockitoExtension.class)
public class RepaymentControllerTest {

    @Mock
    private RepaymentService repaymentService;

    @InjectMocks
    private RepaymentController repaymentController;

    private Repayment repayment;

    @BeforeEach
    void setUp() {
        repayment = new Repayment();
        repayment.setId(1L);
        repayment.setAmount(BigDecimal.valueOf(1000));
    }

    @Test
    void testGetRepaymentsByLoanId() {
        List<Repayment> repayments = Arrays.asList(repayment);
        when(repaymentService.getRepaymentsByLoanId(anyLong())).thenReturn(repayments);

        ResponseEntity<List<Repayment>> response = repaymentController.getRepaymentsByLoanId(1L);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(repayments, response.getBody());
    }

    @Test
    void testCalculateRepaymentAmount_Success() {
        BigDecimal repaymentAmount = BigDecimal.valueOf(1000);
        when(repaymentService.calculateRepaymentAmount(anyLong())).thenReturn(repaymentAmount);

        ResponseEntity<BigDecimal> response = repaymentController.calculateRepaymentAmount(1L);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(repaymentAmount, response.getBody());
    }

    @Test
    void testCalculateRepaymentAmount_Exception() {
        when(repaymentService.calculateRepaymentAmount(anyLong())).thenThrow(new RuntimeException("Calculation error"));

        ResponseEntity<BigDecimal> response = repaymentController.calculateRepaymentAmount(1L);

        assertNotNull(response);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertNull(response.getBody());
    }

//    @Test
//    void testCreateRepayment() {
//        when(repaymentService.createRepayment(any(Repayment.class))).thenReturn(repayment);
//
//        ResponseEntity<Repayment> response = repaymentController.createRepayment(repayment);
//
//        assertNotNull(response);
//        assertEquals(HttpStatus.OK, response.getStatusCode());
//        assertEquals(repayment, response.getBody());
//    }

    @Test
    void testUpdateRepayment() {
        when(repaymentService.updateRepayment(anyLong(), any(Repayment.class))).thenReturn(repayment);

        ResponseEntity<Repayment> response = repaymentController.updateRepayment(1L, repayment);

        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(repayment, response.getBody());
    }

    @Test
    void testDeleteRepayment() {
        doNothing().when(repaymentService).deleteRepayment(anyLong());

        ResponseEntity<Void> response = repaymentController.deleteRepayment(1L);

        assertNotNull(response);
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        assertNull(response.getBody());
    }
}
