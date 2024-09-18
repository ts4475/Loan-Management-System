package com.example.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class LoanProductDetailsDTOTest {

    @Test
    public void testDefaultConstructor() {
        LoanProductDetailsDTO loanProduct = new LoanProductDetailsDTO();

        assertNotNull(loanProduct);
    }

    @Test
    public void testParameterizedConstructor() {
        long productId = 1L;
        String productName = "Personal Loan";
        float productInterestRate = 10.5f;
        float productProcessingFee = 1.0f;
        VendorDTO vendor = new VendorDTO();
        int productPrepaymentCharge = 2;
        String productPrepaymentConditions = "No prepayment allowed in first 6 months";

        LoanProductDetailsDTO loanProduct = new LoanProductDetailsDTO(productId, productName, productInterestRate, productProcessingFee, vendor, productPrepaymentCharge, productPrepaymentConditions);

        assertEquals(productId, loanProduct.getProductId());
        assertEquals(productName, loanProduct.getProductName());
        assertEquals(productInterestRate, loanProduct.getProductInterestRate());
        assertEquals(productProcessingFee, loanProduct.getProductProcessingFee());
        assertEquals(vendor, loanProduct.getVendor());
        assertEquals(productPrepaymentCharge, loanProduct.getProductPrepaymentCharge());
        assertEquals(productPrepaymentConditions, loanProduct.getProductPrepaymentConditions());
    }

    @Test
    public void testSettersAndGetters() {
        LoanProductDetailsDTO loanProduct = new LoanProductDetailsDTO();

        long productId = 1L;
        String productName = "Personal Loan";
        float productInterestRate = 10.5f;
        float productProcessingFee = 1.0f;
        VendorDTO vendor = new VendorDTO();
        int productPrepaymentCharge = 2;
        String productPrepaymentConditions = "No prepayment allowed in first 6 months";

        loanProduct.setProductId(productId);
        loanProduct.setProductName(productName);
        loanProduct.setProductInterestRate(productInterestRate);
        loanProduct.setProductProcessingFee(productProcessingFee);
        loanProduct.setVendor(vendor);
        loanProduct.setProductPrepaymentCharge(productPrepaymentCharge);
        loanProduct.setProductPrepaymentConditions(productPrepaymentConditions);

        assertEquals(productId, loanProduct.getProductId());
        assertEquals(productName, loanProduct.getProductName());
        assertEquals(productInterestRate, loanProduct.getProductInterestRate());
        assertEquals(productProcessingFee, loanProduct.getProductProcessingFee());
        assertEquals(vendor, loanProduct.getVendor());
        assertEquals(productPrepaymentCharge, loanProduct.getProductPrepaymentCharge());
        assertEquals(productPrepaymentConditions, loanProduct.getProductPrepaymentConditions());
    }
}
