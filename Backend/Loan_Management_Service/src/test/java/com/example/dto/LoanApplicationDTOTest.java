package com.example.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class LoanApplicationDTOTest {

    @Test
    public void testDefaultConstructor() {
        LoanApplicationDTO loanApplication = new LoanApplicationDTO();

        assertNotNull(loanApplication);
    }

    @Test
    public void testParameterizedConstructor() {
        long applicationId = 1L;
        int amountRequired = 10000;
        int tenure = 12;
        String createdAt = "2023-06-21T10:15:30";
        String updatedAt = "2024-06-21T10:15:30";
        String reviewMessage = "Approved";
        String status = "Pending";
        UserDTO user = new UserDTO();
        LoanProductDetailsDTO product = new LoanProductDetailsDTO();
        VendorDTO vendor = new VendorDTO();

        LoanApplicationDTO loanApplication = new LoanApplicationDTO(applicationId, amountRequired, tenure, createdAt, updatedAt, reviewMessage, status, user, product, vendor);

        assertEquals(applicationId, loanApplication.getApplicationId());
        assertEquals(amountRequired, loanApplication.getAmountRequired());
        assertEquals(tenure, loanApplication.getTenure());
        assertEquals(createdAt, loanApplication.getCreatedAt());
        assertEquals(updatedAt, loanApplication.getUpdatedAt());
        assertEquals(reviewMessage, loanApplication.getReviewMessage());
        assertEquals(status, loanApplication.getStatus());
        assertEquals(user, loanApplication.getUser());
        assertEquals(product, loanApplication.getProduct());
        assertEquals(vendor, loanApplication.getVendor());
    }

    @Test
    public void testSettersAndGetters() {
        LoanApplicationDTO loanApplication = new LoanApplicationDTO();

        long applicationId = 1L;
        int amountRequired = 10000;
        int tenure = 12;
        String createdAt = "2023-06-21T10:15:30";
        String updatedAt = "2024-06-21T10:15:30";
        String reviewMessage = "Approved";
        String status = "Pending";
        UserDTO user = new UserDTO();
        LoanProductDetailsDTO product = new LoanProductDetailsDTO();
        VendorDTO vendor = new VendorDTO();

        loanApplication.setApplicationId(applicationId);
        loanApplication.setAmountRequired(amountRequired);
        loanApplication.setTenure(tenure);
        loanApplication.setCreatedAt(createdAt);
        loanApplication.setUpdatedAt(updatedAt);
        loanApplication.setReviewMessage(reviewMessage);
        loanApplication.setStatus(status);
        loanApplication.setUser(user);
        loanApplication.setProduct(product);
        loanApplication.setVendor(vendor);

        assertEquals(applicationId, loanApplication.getApplicationId());
        assertEquals(amountRequired, loanApplication.getAmountRequired());
        assertEquals(tenure, loanApplication.getTenure());
        assertEquals(createdAt, loanApplication.getCreatedAt());
        assertEquals(updatedAt, loanApplication.getUpdatedAt());
        assertEquals(reviewMessage, loanApplication.getReviewMessage());
        assertEquals(status, loanApplication.getStatus());
        assertEquals(user, loanApplication.getUser());
        assertEquals(product, loanApplication.getProduct());
        assertEquals(vendor, loanApplication.getVendor());
    }
}
