package com.example.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class VendorDTOTest {

    @Test
    public void testDefaultConstructor() {
        VendorDTO vendor = new VendorDTO();

        assertNotNull(vendor);
    }

    @Test
    public void testParameterizedConstructor() {
        long vendorId = 1L;
        String vendorName = "VendorName";
        String contactPhone = "1234567890";
        String contactEmail = "vendor@example.com";
        String vendorLogo = "logo.png";

        VendorDTO vendor = new VendorDTO(vendorId, vendorName, contactPhone, contactEmail, vendorLogo);

        assertEquals(vendorId, vendor.getVendorId());
        assertEquals(vendorName, vendor.getVendorName());
        assertEquals(contactPhone, vendor.getContactPhone());
        assertEquals(contactEmail, vendor.getContactEmail());
        assertEquals(vendorLogo, vendor.getVendorLogo());
    }

    @Test
    public void testSettersAndGetters() {
        VendorDTO vendor = new VendorDTO();

        long vendorId = 1L;
        String vendorName = "VendorName";
        String contactPhone = "1234567890";
        String contactEmail = "vendor@example.com";
        String vendorLogo = "logo.png";

        vendor.setVendorId(vendorId);
        vendor.setVendorName(vendorName);
        vendor.setContactPhone(contactPhone);
        vendor.setContactEmail(contactEmail);
        vendor.setVendorLogo(vendorLogo);

        assertEquals(vendorId, vendor.getVendorId());
        assertEquals(vendorName, vendor.getVendorName());
        assertEquals(contactPhone, vendor.getContactPhone());
        assertEquals(contactEmail, vendor.getContactEmail());
        assertEquals(vendorLogo, vendor.getVendorLogo());
    }
}
