package com.example.controller;

import com.example.model.Transaction;
import com.example.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    
    private final TransactionService transactionService;
    
    public TransactionController(TransactionService transactionService) {
    	this.transactionService = transactionService;
    }

    @GetMapping("/loan/{loanId}")
    public ResponseEntity<List<Transaction>> getTransactionsByLoanId(@PathVariable("loanId") Long loanId) {
        List<Transaction> transactions = transactionService.getTransactionsByLoanId(loanId);
        return ResponseEntity.ok(transactions);
    }

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(@RequestBody Transaction transaction) {
        Transaction createdTransaction = transactionService.recordTransaction(transaction);
        return ResponseEntity.ok(createdTransaction);
        
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable("id") Long id, @RequestBody Transaction transactionDetails) {
        Transaction updatedTransaction = transactionService.updateTransaction(id, transactionDetails);
        return ResponseEntity.ok(updatedTransaction);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable("id") Long id) {
        transactionService.deleteTransaction(id);
        return ResponseEntity.noContent().build();
    }
}
