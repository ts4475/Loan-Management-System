package com.example.model;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.model.EmailDetails;

@ExtendWith(MockitoExtension.class)
public class EmailDetailsTest {

    @InjectMocks
    private EmailDetails emailDetails;

    @BeforeEach
    public void setUp() {
        emailDetails = new EmailDetails(1L, "recipient@example.com", "Subject", "Message Body");
    }

    @Test
    public void testDefaultConstructor() {
        EmailDetails defaultEmailDetails = new EmailDetails();
        assertNotNull(defaultEmailDetails);
        assertNull(defaultEmailDetails.getRecipient());
        assertNull(defaultEmailDetails.getSubject());
        assertNull(defaultEmailDetails.getMsgBody());
    }

    @Test
    public void testParameterizedConstructor() {
        assertEquals(1L, emailDetails.getId());
        assertEquals("recipient@example.com", emailDetails.getRecipient());
        assertEquals("Subject", emailDetails.getSubject());
        assertEquals("Message Body", emailDetails.getMsgBody());
    }

    @Test
    public void testGettersAndSetters() {
        emailDetails.setId(2L);
        emailDetails.setRecipient("newrecipient@example.com");
        emailDetails.setSubject("New Subject");
        emailDetails.setMsgBody("New Message Body");

        assertEquals(2L, emailDetails.getId());
        assertEquals("newrecipient@example.com", emailDetails.getRecipient());
        assertEquals("New Subject", emailDetails.getSubject());
        assertEquals("New Message Body", emailDetails.getMsgBody());
    }
}
