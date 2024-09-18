package com.example.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.example.model.Repayment.RepaymentStatus;





public class RepaymentRequestDTO {
	private Long loanId;
    private BigDecimal amount;
    private LocalDateTime repaymentDate;
    private RepaymentStatus status;
	public RepaymentRequestDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public RepaymentRequestDTO(Long loanId, BigDecimal amount, LocalDateTime repaymentDate, RepaymentStatus status) {
		super();
		this.loanId = loanId;
		this.amount = amount;
		this.repaymentDate = repaymentDate;
		this.status = status;
	}
	public Long getLoanId() {
		return loanId;
	}
	public void setLoanId(Long loanId) {
		this.loanId = loanId;
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
