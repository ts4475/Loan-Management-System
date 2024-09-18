package com.example.service;



import com.example.exception.ResourceNotFoundException;
import com.example.model.Vendors;
import com.example.repository.VendorsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendorsService {

    @Autowired
    private VendorsRepository vendorsRepository;

    public List<Vendors> getAllVendors() {
        return vendorsRepository.findAll();
    }

    public Vendors getVendorById(long id) throws ResourceNotFoundException {
        return vendorsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found for the ID: " + id));
    }

    public Vendors addVendor(Vendors vendor) {
        return vendorsRepository.save(vendor);
    }

    public void updateVendor(long id, Vendors newVendor) throws ResourceNotFoundException {
        Vendors vendor = vendorsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found for the ID: " + id));
        if (newVendor.getVendor_name() != null) {
            vendor.setVendor_name(newVendor.getVendor_name());
        }
        if (newVendor.getContact_phone() != null) {
        	vendor.setContact_phone(newVendor.getContact_phone());
        }
        if (newVendor.getContact_email() != null) {
        	 vendor.setContact_email(newVendor.getContact_email());
        }
        if (newVendor.getVendor_logo() != null) {
        	vendor.setVendor_logo(newVendor.getVendor_logo());
       }
        vendorsRepository.save(vendor);
    }

    public void deleteVendor(long id) throws ResourceNotFoundException {
        Vendors vendor = vendorsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor not found for the ID: " + id));
        vendorsRepository.delete(vendor);
    }
}
