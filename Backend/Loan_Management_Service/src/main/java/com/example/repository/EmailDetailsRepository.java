
package com.example.repository;

import com.example.model.EmailDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailDetailsRepository extends JpaRepository<EmailDetails, Long> {
    // Custom query methods can be added here if needed
}

