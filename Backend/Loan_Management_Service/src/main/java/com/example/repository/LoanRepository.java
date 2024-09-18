package com.example.repository;

import com.example.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    // Custom query methods can be added here if needed
	@Query("SELECT l FROM Loan l WHERE l.id = :loanId")
    Loan findByLoanId(@Param("loanId") Long loanId);
	
    List<Loan> findByCustomerId(Long customerId);
}

