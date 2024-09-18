package com.example.dto;


import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;




public class ErrorResponse {
    private LocalDateTime timestamp;
    private HttpStatus status;
    private String error;
    private String message;
    
    public ErrorResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ErrorResponse(LocalDateTime timestamp, HttpStatus status, String error, String message) {
		super();
		this.timestamp = timestamp;
		this.status = status;
		this.error = error;
		this.message = message;
	}
    
    
    
	public LocalDateTime getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}
	public HttpStatus getStatus() {
		return status;
	}
	public void setStatus(HttpStatus status) {
		this.status = status;
	}
	public String getError() {
		return error;
	}
	public void setError(String error) {
		this.error = error;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	
    
}
