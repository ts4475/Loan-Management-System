package com.example.exception;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class GlobalExceptionHandlerTests {

    private GlobalExceptionHandler globalExceptionHandler;
    private WebRequest webRequest;

    @BeforeEach
    public void setUp() {
        globalExceptionHandler = new GlobalExceptionHandler();
        webRequest = mock(WebRequest.class);
    }

    @Test
    public void testResourceNotFoundException() {
        ResourceNotFoundException exception = new ResourceNotFoundException("Resource not found");
        when(webRequest.getDescription(false)).thenReturn("details");

        ResponseEntity<?> response = globalExceptionHandler.resourceNotFoundException(exception, webRequest);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        ErrorDetails errorDetails = (ErrorDetails) response.getBody();
        assertEquals("Resource not found", errorDetails.getMessage());
        assertEquals("details", errorDetails.getDetails());
    }

    @Test
    public void testGlobleExcpetionHandler() {
        Exception exception = new Exception("Internal server error");
        when(webRequest.getDescription(false)).thenReturn("details");

        ResponseEntity<?> response = globalExceptionHandler.globleExcpetionHandler(exception, webRequest);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        ErrorDetails errorDetails = (ErrorDetails) response.getBody();
        assertEquals("Internal server error", errorDetails.getMessage());
        assertEquals("details", errorDetails.getDetails());
    }
}
