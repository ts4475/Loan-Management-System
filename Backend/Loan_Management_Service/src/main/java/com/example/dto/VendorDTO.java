package com.example.dto;

import com.fasterxml.jackson.annotation.JsonProperty;



public class VendorDTO {
    @JsonProperty("vendor_id")
    private long vendorId;
    @JsonProperty("vendor_name")
    private String vendorName;
    @JsonProperty("contact_phone")
    private String contactPhone;
    @JsonProperty("contact_email")
    private String contactEmail;
    @JsonProperty("vendor_logo")
    private String vendorLogo;
	public VendorDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public VendorDTO(long vendorId, String vendorName, String contactPhone, String contactEmail, String vendorLogo) {
		super();
		this.vendorId = vendorId;
		this.vendorName = vendorName;
		this.contactPhone = contactPhone;
		this.contactEmail = contactEmail;
		this.vendorLogo = vendorLogo;
	}
	public long getVendorId() {
		return vendorId;
	}
	public void setVendorId(long vendorId) {
		this.vendorId = vendorId;
	}
	public String getVendorName() {
		return vendorName;
	}
	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}
	public String getContactPhone() {
		return contactPhone;
	}
	public void setContactPhone(String contactPhone) {
		this.contactPhone = contactPhone;
	}
	public String getContactEmail() {
		return contactEmail;
	}
	public void setContactEmail(String contactEmail) {
		this.contactEmail = contactEmail;
	}
	public String getVendorLogo() {
		return vendorLogo;
	}
	public void setVendorLogo(String vendorLogo) {
		this.vendorLogo = vendorLogo;
	}
    
    
}
