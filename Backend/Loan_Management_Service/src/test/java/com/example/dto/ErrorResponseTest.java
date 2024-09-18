package com.example.dto;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;


public class ErrorResponseTest {

    

    @Test
    public void testParameterizedConstructor() {
        LocalDateTime now = LocalDateTime.now();
        HttpStatus status = HttpStatus.BAD_REQUEST;
        String error = "Bad Request";
        String message = "Invalid request parameters";

        ErrorResponse errorResponse = new ErrorResponse(now, status, error, message);

        assertEquals(now, errorResponse.getTimestamp());
        assertEquals(status, errorResponse.getStatus());
        assertEquals(error, errorResponse.getError());
        assertEquals(message, errorResponse.getMessage());
    }

    @Test
    public void testSettersAndGetters() {
        ErrorResponse errorResponse = new ErrorResponse();

        LocalDateTime now = LocalDateTime.now();
        errorResponse.setTimestamp(now);
        errorResponse.setStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        errorResponse.setError("Internal Server Error");
        errorResponse.setMessage("An unexpected error occurred");

        assertEquals(now, errorResponse.getTimestamp());
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, errorResponse.getStatus());
        assertEquals("Internal Server Error", errorResponse.getError());
        assertEquals("An unexpected error occurred", errorResponse.getMessage());
    }
}
