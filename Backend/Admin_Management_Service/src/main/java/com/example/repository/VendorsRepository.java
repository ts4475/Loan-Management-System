package com.example.repository;

import com.example.model.Vendors;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendorsRepository extends JpaRepository<Vendors, Long> {
}
