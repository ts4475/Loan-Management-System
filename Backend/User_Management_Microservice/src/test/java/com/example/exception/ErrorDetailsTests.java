package com.example.exception;

import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ErrorDetailsTests {

    @Test
    public void testErrorDetails() {
        Date timestamp = new Date();
        String message = "Error message";
        String details = "Error details";

        ErrorDetails errorDetails = new ErrorDetails(timestamp, message, details);

        assertEquals(timestamp, errorDetails.getTimestamp());
        assertEquals(message, errorDetails.getMessage());
        assertEquals(details, errorDetails.getDetails());
    }

    @Test
    public void testErrorDetailsSetters() {
        Date timestamp = new Date();
        String message = "Error message";
        String details = "Error details";

        ErrorDetails errorDetails = new ErrorDetails(timestamp, message, details);

        errorDetails.setTimestamp(new Date());
        errorDetails.setMessage("New message");
        errorDetails.setDetails("New details");

        assertEquals("New message", errorDetails.getMessage());
        assertEquals("New details", errorDetails.getDetails());
    }
}
