package com.example.dto;

import com.fasterxml.jackson.annotation.JsonProperty;



public class LoanProductDetailsDTO {
    @JsonProperty("product_id")
    private long productId;
    @JsonProperty("product_name")
    private String productName;
    @JsonProperty("product_interest_rate")
    private float productInterestRate;
    @JsonProperty("product_processing_fee")
    private float productProcessingFee;
    @JsonProperty("vendor")
    private VendorDTO vendor;
    @JsonProperty("product_prepayment_charge")
    private int productPrepaymentCharge;
    @JsonProperty("product_prepayment_conditions")
    private String productPrepaymentConditions;
	public LoanProductDetailsDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public LoanProductDetailsDTO(long productId, String productName, float productInterestRate,
			float productProcessingFee, VendorDTO vendor, int productPrepaymentCharge,
			String productPrepaymentConditions) {
		super();
		this.productId = productId;
		this.productName = productName;
		this.productInterestRate = productInterestRate;
		this.productProcessingFee = productProcessingFee;
		this.vendor = vendor;
		this.productPrepaymentCharge = productPrepaymentCharge;
		this.productPrepaymentConditions = productPrepaymentConditions;
	}
	public long getProductId() {
		return productId;
	}
	public void setProductId(long productId) {
		this.productId = productId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public float getProductInterestRate() {
		return productInterestRate;
	}
	public void setProductInterestRate(float productInterestRate) {
		this.productInterestRate = productInterestRate;
	}
	public float getProductProcessingFee() {
		return productProcessingFee;
	}
	public void setProductProcessingFee(float productProcessingFee) {
		this.productProcessingFee = productProcessingFee;
	}
	public VendorDTO getVendor() {
		return vendor;
	}
	public void setVendor(VendorDTO vendor) {
		this.vendor = vendor;
	}
	public int getProductPrepaymentCharge() {
		return productPrepaymentCharge;
	}
	public void setProductPrepaymentCharge(int productPrepaymentCharge) {
		this.productPrepaymentCharge = productPrepaymentCharge;
	}
	public String getProductPrepaymentConditions() {
		return productPrepaymentConditions;
	}
	public void setProductPrepaymentConditions(String productPrepaymentConditions) {
		this.productPrepaymentConditions = productPrepaymentConditions;
	}
    
    
}
