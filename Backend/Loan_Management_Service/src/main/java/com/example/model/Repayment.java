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
@Table(name = "repayments")
//@JsonIgnoreProperties({"loan"})
public class Repayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "loan_id", nullable = false)
    @JsonBackReference
    private Loan loan;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    @Digits(integer = 10, fraction = 2)
    @Column(name = "amount")
    private BigDecimal amount;

    @NotNull
    @PastOrPresent
    @Column(name = "repayment_date", nullable = false)
    private LocalDateTime repaymentDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private RepaymentStatus status;

    public enum RepaymentStatus {
        PENDING,
        COMPLETED,
        FAILED
    }

	public Repayment() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Repayment(long id, @NotNull Loan loan,
			@NotNull @DecimalMin(value = "0.0", inclusive = false) @Digits(integer = 10, fraction = 2) BigDecimal amount,
			@NotNull @PastOrPresent LocalDateTime repaymentDate, @NotNull RepaymentStatus status) {
		super();
		this.id = id;
		this.loan = loan;
		this.amount = amount;
		this.repaymentDate = repaymentDate;
		this.status = status;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
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

	public LocalDateTime getRepaymentDate() {
		return repaymentDate;
	}

	public void setRepaymentDate(LocalDateTime repaymentDate) {
		this.repaymentDate = repaymentDate;
	}

	public RepaymentStatus getStatus() {
		return status;
	}

	public void setStatus(RepaymentStatus status) {
		this.status = status;
	}



}