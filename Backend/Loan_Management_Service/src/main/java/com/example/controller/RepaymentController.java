package com.example.controller;


import com.example.model.Repayment;
import com.example.service.RepaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/repayments")
public class RepaymentController {

	private final RepaymentService repaymentService;

    public RepaymentController(RepaymentService repaymentService) {
        this.repaymentService = repaymentService;
    }
    

    @GetMapping("/loan/{loanId}")
    public ResponseEntity<List<Repayment>> getRepaymentsByLoanId(@PathVariable("loanId") Long loanId) {
        List<Repayment> repayments = repaymentService.getRepaymentsByLoanId(loanId);
        return ResponseEntity.ok(repayments);
    }
    
    @GetMapping("/calculate-repayment-amount/{loanId}")
    public ResponseEntity<BigDecimal> calculateRepaymentAmount(@PathVariable("loanId") Long loanId) {
        try {
            BigDecimal repaymentAmount = repaymentService.calculateRepaymentAmount(loanId);
            return ResponseEntity.ok(repaymentAmount);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/{loanId}")
    public ResponseEntity<Repayment> createRepayment(@PathVariable("loanId") Long loanId) {
        Repayment createdRepayment = repaymentService.createRepayment(loanId);
        return ResponseEntity.ok(createdRepayment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Repayment> updateRepayment(@PathVariable("id") Long id, @RequestBody Repayment repaymentDetails) {
        Repayment updatedRepayment = repaymentService.updateRepayment(id, repaymentDetails);
        return ResponseEntity.ok(updatedRepayment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRepayment(@PathVariable("id") Long id) {
        repaymentService.deleteRepayment(id);
        return ResponseEntity.noContent().build();
        
    }
    
    
}

