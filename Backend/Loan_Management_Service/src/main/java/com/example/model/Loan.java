package com.example.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;


@Entity
@Table(name="loans")
public class Loan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "customer_id", nullable = false)
    private Long customerId;

    @NotNull
    @Column(name = "loan_manager_id", nullable = false)
    private Long loanManagerId;

    @NotNull
    @Column(name = "application_id", nullable=false)
    private Long loanApplication;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private LoanStatus status;



    @DecimalMin(value = "0.0", inclusive = false)
    @Digits(integer = 10, fraction = 2)
    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Digits(integer = 5, fraction = 2)
    @Column(name = "interest_rate", nullable = false)
    private BigDecimal interestRate;
    
    @DecimalMin(value = "0.0", inclusive = false)
    @Digits(integer = 10, fraction = 2)
    @Column(name = "repayableAmount")
    private BigDecimal repayableAmount;
    
    @DecimalMin(value = "0.0", inclusive = false)
    @Digits(integer = 10, fraction = 2)
    @Column(name = "EMIAmount")
    private BigDecimal EMIAmount;
    
    //new column
    @DecimalMin(value = "0.0")
    @Digits(integer = 10, fraction = 2)
    @Column(name = "lateFee")
    private BigDecimal lateFee;
    
    //new column
    @DecimalMin(value = "0.0")
    @Digits(integer = 10, fraction = 2)
    @Column(name = "prePaymentFee")
    private BigDecimal PrePaymentFee;

    @NotNull
    @FutureOrPresent
    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @NotNull
    @Future
    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "repayment_frequency", nullable = false)
    private RepaymentFrequency repaymentFrequency;

    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Repayment> repayments;

    @OneToMany(mappedBy = "loan", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Transaction> transactions;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }



    public enum LoanStatus {
        active,
        paid_off,
        approved,
        applied
    }

    public enum RepaymentFrequency {
        MONTHLY,
        QUARTERLY,
        YEARLY
    }

	public Loan() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Loan(Long id, Long customerId, @NotNull Long loanManagerId, @NotNull Long loanApplication,
			@NotNull LoanStatus status,
			@DecimalMin(value = "0.0", inclusive = false) @Digits(integer = 10, fraction = 2) BigDecimal amount,
			@NotNull @DecimalMin(value = "0.0", inclusive = false) @Digits(integer = 5, fraction = 2) BigDecimal interestRate,
			@DecimalMin(value = "0.0", inclusive = false) @Digits(integer = 10, fraction = 2) BigDecimal repayableAmount,
			@DecimalMin(value = "0.0", inclusive = false) @Digits(integer = 10, fraction = 2) BigDecimal eMIAmount,
			@DecimalMin("0.0") @Digits(integer = 10, fraction = 2) BigDecimal lateFee,
			@DecimalMin("0.0") @Digits(integer = 10, fraction = 2) BigDecimal prePaymentFee,
			@NotNull @FutureOrPresent LocalDate startDate, @NotNull @Future LocalDate endDate,
			@NotNull RepaymentFrequency repaymentFrequency, List<Repayment> repayments, List<Transaction> transactions,
			LocalDateTime createdAt, LocalDateTime updatedAt) {
		super();
		this.id = id;
		this.customerId = customerId;
		this.loanManagerId = loanManagerId;
		this.loanApplication = loanApplication;
		this.status = status;
		this.amount = amount;
		this.interestRate = interestRate;
		this.repayableAmount = repayableAmount;
		EMIAmount = eMIAmount;
		this.lateFee = lateFee;
		PrePaymentFee = prePaymentFee;
		this.startDate = startDate;
		this.endDate = endDate;
		this.repaymentFrequency = repaymentFrequency;
		this.repayments = repayments;
		this.transactions = transactions;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Long customerId) {
		this.customerId = customerId;
	}

	public Long getLoanManagerId() {
		return loanManagerId;
	}

	public void setLoanManagerId(Long loanManagerId) {
		this.loanManagerId = loanManagerId;
	}

	public Long getLoanApplication() {
		return loanApplication;
	}

	public void setLoanApplication(Long loanApplication) {
		this.loanApplication = loanApplication;
	}

	public LoanStatus getStatus() {
		return status;
	}

	public void setStatus(LoanStatus status) {
		this.status = status;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public BigDecimal getInterestRate() {
		return interestRate;
	}

	public void setInterestRate(BigDecimal interestRate) {
		this.interestRate = interestRate;
	}

	public BigDecimal getRepayableAmount() {
		return repayableAmount;
	}

	public void setRepayableAmount(BigDecimal repayableAmount) {
		this.repayableAmount = repayableAmount;
	}

	public BigDecimal getEMIAmount() {
		return EMIAmount;
	}

	public void setEMIAmount(BigDecimal eMIAmount) {
		EMIAmount = eMIAmount;
	}

	public BigDecimal getLateFee() {
		return lateFee;
	}

	public void setLateFee(BigDecimal lateFee) {
		this.lateFee = lateFee;
	}

	public BigDecimal getPrePaymentFee() {
		return PrePaymentFee;
	}

	public void setPrePaymentFee(BigDecimal prePaymentFee) {
		PrePaymentFee = prePaymentFee;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public RepaymentFrequency getRepaymentFrequency() {
		return repaymentFrequency;
	}

	public void setRepaymentFrequency(RepaymentFrequency repaymentFrequency) {
		this.repaymentFrequency = repaymentFrequency;
	}

	public List<Repayment> getRepayments() {
		return repayments;
	}

	public void setRepayments(List<Repayment> repayments) {
		this.repayments = repayments;
	}

	public List<Transaction> getTransactions() {
		return transactions;
	}

	public void setTransactions(List<Transaction> transactions) {
		this.transactions = transactions;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}
    
}
