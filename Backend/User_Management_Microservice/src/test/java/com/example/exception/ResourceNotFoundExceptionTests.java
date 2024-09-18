package com.example.exception;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

public class ResourceNotFoundExceptionTests {

    @Test
    public void testDefaultConstructor() {
        ResourceNotFoundException exception = new ResourceNotFoundException();
        assertNull(exception.getMessage());
        assertNull(exception.getCause());
    }

    @Test
    public void testMessageConstructor() {
        ResourceNotFoundException exception = new ResourceNotFoundException("Resource not found");
        assertEquals("Resource not found", exception.getMessage());
        assertNull(exception.getCause());
    }

    @Test
    public void testCauseConstructor() {
        Throwable cause = new Throwable("Cause of the exception");
        ResourceNotFoundException exception = new ResourceNotFoundException(cause);
        assertEquals("java.lang.Throwable: Cause of the exception", exception.getMessage());
        assertEquals(cause, exception.getCause());
    }

    @Test
    public void testMessageAndCauseConstructor() {
        Throwable cause = new Throwable("Cause of the exception");
        ResourceNotFoundException exception = new ResourceNotFoundException("Resource not found", cause);
        assertEquals("Resource not found", exception.getMessage());
        assertEquals(cause, exception.getCause());
    }

    @Test
    public void testFullConstructor() {
        Throwable cause = new Throwable("Cause of the exception");
        ResourceNotFoundException exception = new ResourceNotFoundException("Resource not found", cause, true, true);
        assertEquals("Resource not found", exception.getMessage());
        assertEquals(cause, exception.getCause());
    }

    @Test
    public void testGetSerialVersionUID() {
        assertEquals(1L, ResourceNotFoundException.getSerialversionuid());
    }
}
