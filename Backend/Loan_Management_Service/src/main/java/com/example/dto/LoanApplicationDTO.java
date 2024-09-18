package com.example.dto;

import com.fasterxml.jackson.annotation.JsonProperty;




public class LoanApplicationDTO {
    @JsonProperty("application_id")
    private long applicationId;
    @JsonProperty("amount_required")
    private int amountRequired;
    @JsonProperty("tenure")
    private int tenure;
    @JsonProperty("created_at")
    private String createdAt;
    @JsonProperty("updated_at")
    private String updatedAt;
    @JsonProperty("review_message")
    private String reviewMessage;
    @JsonProperty("status")
    private String status;
    @JsonProperty("user")
    private UserDTO user;
    @JsonProperty("product")
    private LoanProductDetailsDTO product;
    @JsonProperty("vendor")
    private VendorDTO vendor;
	public LoanApplicationDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public LoanApplicationDTO(long applicationId, int amountRequired, int tenure, String createdAt, String updatedAt,
			String reviewMessage, String status, UserDTO user, LoanProductDetailsDTO product, VendorDTO vendor) {
		super();
		this.applicationId = applicationId;
		this.amountRequired = amountRequired;
		this.tenure = tenure;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.reviewMessage = reviewMessage;
		this.status = status;
		this.user = user;
		this.product = product;
		this.vendor = vendor;
	}
	public long getApplicationId() {
		return applicationId;
	}
	public void setApplicationId(long applicationId) {
		this.applicationId = applicationId;
	}
	public int getAmountRequired() {
		return amountRequired;
	}
	public void setAmountRequired(int amountRequired) {
		this.amountRequired = amountRequired;
	}
	public int getTenure() {
		return tenure;
	}
	public void setTenure(int tenure) {
		this.tenure = tenure;
	}
	public String getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(String createdAt) {
		this.createdAt = createdAt;
	}
	public String getUpdatedAt() {
		return updatedAt;
	}
	public void setUpdatedAt(String updatedAt) {
		this.updatedAt = updatedAt;
	}
	public String getReviewMessage() {
		return reviewMessage;
	}
	public void setReviewMessage(String reviewMessage) {
		this.reviewMessage = reviewMessage;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public UserDTO getUser() {
		return user;
	}
	public void setUser(UserDTO user) {
		this.user = user;
	}
	public LoanProductDetailsDTO getProduct() {
		return product;
	}
	public void setProduct(LoanProductDetailsDTO product) {
		this.product = product;
	}
	public VendorDTO getVendor() {
		return vendor;
	}
	public void setVendor(VendorDTO vendor) {
		this.vendor = vendor;
	}
    
    
}

