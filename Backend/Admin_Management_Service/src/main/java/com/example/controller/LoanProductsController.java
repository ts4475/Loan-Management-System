package com.example.controller;

import com.example.model.LoanProducts;
import com.example.model.Vendors;
import com.example.service.LoanProductsService;
import com.example.dto.LoanProductDetailsDTO;
import com.example.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/loan-products")
public class LoanProductsController {

    @Autowired
    private LoanProductsService loanProductsService;

    @GetMapping("/read")
    public List<LoanProducts> read() {
        return loanProductsService.getAllLoanProducts();
    }

    @GetMapping("/readOne/{id}")
    public LoanProducts readOne(@PathVariable("id") long id) throws ResourceNotFoundException {
        return loanProductsService.getLoanProductById(id);
    }

    @PostMapping("/add")
    public LoanProducts add(@RequestBody LoanProducts loanProduct) {
        return loanProductsService.addLoanProduct(loanProduct);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody LoanProducts loanProduct, @PathVariable("id") long id) throws ResourceNotFoundException {
        loanProductsService.updateLoanProduct(id, loanProduct);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") long id) throws ResourceNotFoundException {
        loanProductsService.deleteLoanProduct(id);
    }
    
    @PatchMapping("/partial-update/{id}")
    public ResponseEntity<Void> partialUpdate(@PathVariable("id") long id, @RequestBody Vendors vendor) throws ResourceNotFoundException {
        loanProductsService.partialUpdateLoanProduct(id, vendor);
        return ResponseEntity.ok().build();
    }
    

    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<List<LoanProducts>> getLoanProductsByVendorId(@PathVariable("vendorId") Long vendorId) {
        List<LoanProducts> loanProducts = loanProductsService.findByVendorId(vendorId);
        return ResponseEntity.ok(loanProducts);
    }
    
    @GetMapping("/{productId}/details")
    public ResponseEntity<LoanProductDetailsDTO> getLoanProductDetails(@PathVariable("productId") Long productId) {
        LoanProductDetailsDTO loanProductDetails = loanProductsService.getLoanProductDetails(productId);
        return ResponseEntity.ok(loanProductDetails);
    }
}
