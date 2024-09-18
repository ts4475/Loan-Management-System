package com.example.controller;



import com.example.model.Vendors;
import com.example.service.VendorsService;
import com.example.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/vendors")
public class VendorsController {

    @Autowired
    private VendorsService vendorsService;

    @GetMapping("/read")
    public List<Vendors> read() {
        return vendorsService.getAllVendors();
    }

    @GetMapping("/readOne/{id}")
    public Vendors readOne(@PathVariable("id") long id) throws ResourceNotFoundException {
        return vendorsService.getVendorById(id);
    }

    @PostMapping("/add")
    public Vendors add(@RequestBody Vendors vendor) {
        return vendorsService.addVendor(vendor);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody Vendors vendor, @PathVariable("id") long id) throws ResourceNotFoundException {
        vendorsService.updateVendor(id, vendor);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") long id) throws ResourceNotFoundException {
        vendorsService.deleteVendor(id);
    }
}
