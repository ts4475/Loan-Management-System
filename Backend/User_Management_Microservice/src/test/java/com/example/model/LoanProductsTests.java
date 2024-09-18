package com.example.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class LoanProductsTests {

    private LoanProducts loanProduct;

    @BeforeEach
    public void setUp() {
        loanProduct = new LoanProducts(1L, LoanProducts.ProductName.Personal, 5.5f, 1.5f, new Vendors(),
                2, "Condition1");
    }

    @Test
    public void testLoanProductAttributes() {
        assertEquals(1L, loanProduct.getProduct_id());
        assertEquals(LoanProducts.ProductName.Personal, loanProduct.getProduct_name());
        assertEquals(5.5f, loanProduct.getProduct_interest_rate());
        assertEquals(1.5f, loanProduct.getProduct_processing_fee());
        assertNotNull(loanProduct.getVendor());
        assertEquals(2, loanProduct.getProduct_prepayment_charge());
        assertEquals("Condition1", loanProduct.getProduct_prepayment_conditions());
    }

    @Test
    public void testSetters() {
        loanProduct.setProduct_name(LoanProducts.ProductName.Gold);
        assertEquals(LoanProducts.ProductName.Gold, loanProduct.getProduct_name());

        loanProduct.setProduct_interest_rate(6.5f);
        assertEquals(6.5f, loanProduct.getProduct_interest_rate());

        loanProduct.setProduct_processing_fee(2.5f);
        assertEquals(2.5f, loanProduct.getProduct_processing_fee());

        Vendors newVendor = new Vendors();
        loanProduct.setVendor(newVendor);
        assertEquals(newVendor, loanProduct.getVendor());

        loanProduct.setProduct_prepayment_charge(3);
        assertEquals(3, loanProduct.getProduct_prepayment_charge());

        loanProduct.setProduct_prepayment_conditions("Condition2");
        assertEquals("Condition2", loanProduct.getProduct_prepayment_conditions());
    }
}
