package com.example.dto;

import com.fasterxml.jackson.annotation.JsonProperty;



public class UserDTO {
    @JsonProperty("user_id")
    private long userId;
    private String email;
    private String password;
    @JsonProperty("first_name")
    private String firstName;
    @JsonProperty("last_name")
    private String lastName;
    private String phone;
    private String address;
    private String pin;
    @JsonProperty("securityQuestion")
    private String securityQuestion;
    @JsonProperty("securityAnswer")
    private String securityAnswer;
    private String pan;
    private String dob;
    @JsonProperty("annualIncome")
    private int annualIncome;
    private String role;
    @JsonProperty("createdAt")
    private String createdAt;
    @JsonProperty("updatedAt")
    private String updatedAt;
	public UserDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public UserDTO(long userId, String email, String password, String firstName, String lastName, String phone,
			String address, String pin, String securityQuestion, String securityAnswer, String pan, String dob,
			int annualIncome, String role, String createdAt, String updatedAt) {
		super();
		this.userId = userId;
		this.email = email;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phone = phone;
		this.address = address;
		this.pin = pin;
		this.securityQuestion = securityQuestion;
		this.securityAnswer = securityAnswer;
		this.pan = pan;
		this.dob = dob;
		this.annualIncome = annualIncome;
		this.role = role;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPin() {
		return pin;
	}
	public void setPin(String pin) {
		this.pin = pin;
	}
	public String getSecurityQuestion() {
		return securityQuestion;
	}
	public void setSecurityQuestion(String securityQuestion) {
		this.securityQuestion = securityQuestion;
	}
	public String getSecurityAnswer() {
		return securityAnswer;
	}
	public void setSecurityAnswer(String securityAnswer) {
		this.securityAnswer = securityAnswer;
	}
	public String getPan() {
		return pan;
	}
	public void setPan(String pan) {
		this.pan = pan;
	}
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	public int getAnnualIncome() {
		return annualIncome;
	}
	public void setAnnualIncome(int annualIncome) {
		this.annualIncome = annualIncome;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
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
    
    
}

