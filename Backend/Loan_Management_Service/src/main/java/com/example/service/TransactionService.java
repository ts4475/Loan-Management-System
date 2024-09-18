package com.example.service;

import com.example.exception.TransactionNotFoundException;
import com.example.model.Transaction;
import com.example.repository.TransactionRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;



import java.util.List;

@Service
public class TransactionService {

	private final TransactionRepository transactionRepository;

    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public List<Transaction> getTransactionsByLoanId(Long loanId) {
        return transactionRepository.findByLoanId(loanId);
    }
    
    @Transactional
    public Transaction recordTransaction(Transaction transaction) {
        transaction.setTransactionDate(LocalDateTime.now());
        return transactionRepository.save(transaction);
    }

//    @Transactional
//    public Transaction createTransaction(Transaction transaction) {
//        return transactionRepository.save(transaction);
//    }

    @Transactional
    public Transaction updateTransaction(Long transactionId, Transaction transactionDetails) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new TransactionNotFoundException("Transaction not found with id " + transactionId));

        transaction.setTransactionDate(transactionDetails.getTransactionDate());
        transaction.setAmount(transactionDetails.getAmount());
        transaction.setType(transactionDetails.getType());

        return transactionRepository.save(transaction);
    }

    @Transactional
    public void deleteTransaction(Long transactionId) {
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new TransactionNotFoundException("Transaction not found with id " + transactionId));

        transactionRepository.delete(transaction);
    }
}
