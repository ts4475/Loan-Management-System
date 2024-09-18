package com.example.repository;

import com.example.model.LoanProducts;
import com.example.model.Vendors;

import jakarta.transaction.Transactional;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LoanProductsRepository extends JpaRepository<LoanProducts, Long> 
{
	 @Modifying
	    @Transactional
	    @Query("UPDATE LoanProducts lp SET lp.vendor = :vendor WHERE lp.product_id = :productId")
	    void updateVendorId(@Param("productId") Long productId, @Param("vendor") Vendors vendor);
	 
	 @Query("SELECT lp FROM LoanProducts lp WHERE lp.vendor.vendor_id = :vendorId")
	    List<LoanProducts> findByVendorVendorId(@Param("vendorId") Long vendorId);
	 
	 
}
