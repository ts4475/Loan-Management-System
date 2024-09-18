package com.example.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;


import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;



@Entity
@Table(name = "transactions")
//@JsonIgnoreProperties({"loan"})
public class Transaction {
    

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "loan_id", nullable = false)
    @JsonBackReference
    private Loan loan;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Digits(integer = 10, fraction = 2)
    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private TransactionType type;

    @NotNull
    @PastOrPresent
    @Column(name = "transaction_date", nullable = false)
    private LocalDateTime transactionDate;

	public Transaction() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Transaction(Long id, @NotNull Loan loan,
			@NotNull @DecimalMin(value = "0.0", inclusive = false) @Digits(integer = 10, fraction = 2) BigDecimal amount,
			@NotNull TransactionType type, @NotNull @PastOrPresent LocalDateTime transactionDate) {
		super();
		this.id = id;
		this.loan = loan;
		this.amount = amount;
		this.type = type;
		this.transactionDate = transactionDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Loan getLoan() {
		return loan;
	}

	public void setLoan(Loan loan) {
		this.loan = loan;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public TransactionType getType() {
		return type;
	}

	public void setType(TransactionType type) {
		this.type = type;
	}

	public LocalDateTime getTransactionDate() {
		return transactionDate;
	}

	public void setTransactionDate(LocalDateTime transactionDate) {
		this.transactionDate = transactionDate;
	}

    
    
}
