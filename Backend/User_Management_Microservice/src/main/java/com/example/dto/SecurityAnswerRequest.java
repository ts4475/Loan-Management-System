package com.example.dto;

public class SecurityAnswerRequest {
    private String email;
    public SecurityAnswerRequest() {
		super();
		// TODO Auto-generated constructor stub
	}
	public SecurityAnswerRequest(String email, String answer) {
		super();
		this.email = email;
		this.answer = answer;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAnswer() {
		return answer;
	}
	public void setAnswer(String answer) {
		this.answer = answer;
	}
	private String answer;
    // getters and setters
}
