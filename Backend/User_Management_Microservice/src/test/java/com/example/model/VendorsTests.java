package com.example.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class VendorsTests {

    private Vendors vendor;

    @BeforeEach
    public void setUp() {
        vendor = new Vendors(1L, "Vendor Name", "1234567890", "vendor@example.com", "http://example.com/logo.png");
    }

    @Test
    public void testVendorAttributes() {
        assertEquals(1L, vendor.getVendor_id());
        assertEquals("Vendor Name", vendor.getVendor_name());
        assertEquals("1234567890", vendor.getContact_phone());
        assertEquals("vendor@example.com", vendor.getContact_email());
        assertEquals("http://example.com/logo.png", vendor.getVendor_logo());
    }

    @Test
    public void testSetters() {
        vendor.setVendor_name("New Vendor Name");
        assertEquals("New Vendor Name", vendor.getVendor_name());

        vendor.setContact_phone("0987654321");
        assertEquals("0987654321", vendor.getContact_phone());

        vendor.setContact_email("newvendor@example.com");
        assertEquals("newvendor@example.com", vendor.getContact_email());

        vendor.setVendor_logo("http://example.com/newlogo.png");
        assertEquals("http://example.com/newlogo.png", vendor.getVendor_logo());
    }
}
