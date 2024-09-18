package com.example.controller;

import com.example.exception.InvalidLoanApplicationException;
import com.example.exception.LoanNotFoundException;
import com.example.model.Loan;
import com.example.service.LoanService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/loans")
public class LoanController {

	private final LoanService loanService;

    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    @PostMapping("/create/{id}")
    public ResponseEntity<Loan> createLoan(@PathVariable("id") Long loanappId) {
        try {
            Loan createdLoan = loanService.createLoan(loanappId);
            return new ResponseEntity<>(createdLoan, HttpStatus.CREATED);
        } catch (InvalidLoanApplicationException e) {
        	return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Loan> updateLoan(@PathVariable("id") Long loanId, @Valid @RequestBody Loan loan) {
        try {
            Loan updatedLoan = loanService.updateLoan(loanId, loan);
            return new ResponseEntity<>(updatedLoan, HttpStatus.OK);
        } catch (LoanNotFoundException e) {
        	return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Loan> getLoanById(@PathVariable("id") Long loanId) {
        try {
            Loan loan = loanService.getLoanById(loanId);
            return new ResponseEntity<>(loan, HttpStatus.OK);
        } catch (LoanNotFoundException e) {
        	return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Loan>> getLoansByCustomerId(@PathVariable("customerId") Long customerId) {
        List<Loan> loans = loanService.getLoansByCustomerId(customerId);
        return new ResponseEntity<>(loans, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Loan>> getAllLoans() {
        List<Loan> loans = loanService.getAllLoans();
        return new ResponseEntity<>(loans, HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLoanById(@PathVariable("id") Long id) {
        loanService.deleteLoanById(id);
        return ResponseEntity.noContent().build();
    }
}
