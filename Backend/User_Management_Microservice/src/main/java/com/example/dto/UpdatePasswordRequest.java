package com.example.dto;

public class UpdatePasswordRequest {
    private String email;
    private String newPassword;
    // getters and setters
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	public UpdatePasswordRequest(String email, String newPassword) {
		super();
		this.email = email;
		this.newPassword = newPassword;
	}
	public UpdatePasswordRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
}
