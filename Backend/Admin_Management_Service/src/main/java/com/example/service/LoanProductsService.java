package com.example.service;

import com.example.dto.LoanProductDetailsDTO;
import com.example.exception.ResourceNotFoundException;
import com.example.model.LoanProducts;
import com.example.model.Vendors;
import com.example.repository.LoanProductsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoanProductsService {

    @Autowired
    private LoanProductsRepository loanProductsRepository;

    public List<LoanProducts> getAllLoanProducts() {
        return loanProductsRepository.findAll();
    }

    public LoanProducts getLoanProductById(long id) throws ResourceNotFoundException {
        return loanProductsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Loan Product not found for the ID: " + id));
    }

    public LoanProducts addLoanProduct(LoanProducts loanProduct) {
        return loanProductsRepository.save(loanProduct);
    }

    public void updateLoanProduct(long id, LoanProducts newLoanProduct) throws ResourceNotFoundException {
        LoanProducts loanProduct = loanProductsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Loan Product not found for the ID: " + id));

        loanProduct.setProduct_name(newLoanProduct.getProduct_name());
        loanProduct.setProduct_interest_rate(newLoanProduct.getProduct_interest_rate());
        loanProduct.setProduct_processing_fee(newLoanProduct.getProduct_processing_fee());
        loanProduct.setProduct_prepayment_conditions(newLoanProduct.getProduct_prepayment_conditions());   
        loanProduct.setVendor(newLoanProduct.getVendor());

        loanProductsRepository.save(loanProduct);
    }

    public void deleteLoanProduct(long id) throws ResourceNotFoundException {
        LoanProducts loanProduct = loanProductsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Loan Product not found for the ID: " + id));
        loanProductsRepository.delete(loanProduct);
    }
    
    public void partialUpdateLoanProduct(long id, Vendors vendor) throws ResourceNotFoundException {
        loanProductsRepository.updateVendorId(id, vendor);
    }
    
    public List<LoanProducts> findByVendorId(Long vendorId) {
        return loanProductsRepository.findByVendorVendorId(vendorId);
    }
    
    public LoanProductDetailsDTO getLoanProductDetails(Long productId) {
        LoanProducts loanProduct = loanProductsRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Loan product not found for ID: " + productId));
 
        return new LoanProductDetailsDTO(
                loanProduct.getProduct_interest_rate(),
                loanProduct.getProduct_prepayment_charge()
        );
    }
   
}
