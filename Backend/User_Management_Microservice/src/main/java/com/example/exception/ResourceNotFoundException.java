package com.example.exception;
 
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
 
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends Exception{
 
	private static final long serialVersionUID = 1L;
 
	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public ResourceNotFoundException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ResourceNotFoundException(String message, Throwable cause, boolean enableSuppression,
			boolean writableStackTrace) {
		super(message, cause, enableSuppression, writableStackTrace);
		// TODO Auto-generated constructor stub
	}

	public ResourceNotFoundException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	public ResourceNotFoundException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}

	public ResourceNotFoundException(String message){
    	super(message);
    }
}
