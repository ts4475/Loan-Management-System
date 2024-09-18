package com.example.repository;

import com.example.model.Managers;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ManagersRepository extends JpaRepository<Managers, Long> {
	
	@Query("SELECT m FROM Managers m WHERE m.vendor.vendor_id = :vendor_id")
    Optional<Managers> findByVendorVendorId(@Param("vendor_id") Long vendor_id);
	
	@Query("SELECT m FROM Managers m WHERE m.user.user_id = :userId")
    Managers findByUserUserId(@Param("userId") Long userId);
}
