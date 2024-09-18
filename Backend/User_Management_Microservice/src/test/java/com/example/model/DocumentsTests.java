package com.example.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class DocumentsTests {

    private Documents document;

    @BeforeEach
    public void setUp() {
        document = new Documents(1L, Documents.DocumentType.Aadhar, Documents.DocumentStatus.OK,
                "http://example.com/document", LocalDateTime.now(), new LoanApplication());
    }

    @Test
    public void testDocumentAttributes() {
        assertEquals(1L, document.getDocument_id());
        assertEquals(Documents.DocumentType.Aadhar, document.getDocument_type());
        assertEquals(Documents.DocumentStatus.OK, document.getDocument_status());
        assertEquals("http://example.com/document", document.getDocument_url());
        assertNotNull(document.getLoanApplication());
    }

    @Test
    public void testDocumentTimestamps() {
        document.onCreate();
        assertEquals(Documents.DocumentStatus.OK, document.getDocument_status());

        document.onUpdate();
        assertNotNull(document.getUpdated_at());
    }

    @Test
    public void testSetters() {
        document.setDocument_type(Documents.DocumentType.PAN);
        assertEquals(Documents.DocumentType.PAN, document.getDocument_type());

        document.setDocument_status(Documents.DocumentStatus.NotOK);
        assertEquals(Documents.DocumentStatus.NotOK, document.getDocument_status());

        document.setDocument_url("http://example.com/newdocument");
        assertEquals("http://example.com/newdocument", document.getDocument_url());

        LocalDateTime newTime = LocalDateTime.now();
        document.setUpdated_at(newTime);
        assertEquals(newTime, document.getUpdated_at());

        LoanApplication newLoanApplication = new LoanApplication();
        document.setLoanApplication(newLoanApplication);
        assertEquals(newLoanApplication, document.getLoanApplication());
    }
}
