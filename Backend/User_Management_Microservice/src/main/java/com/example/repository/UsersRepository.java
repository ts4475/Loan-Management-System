package com.example.repository;
 
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
 
import com.example.model.Users;
import com.example.model.Users;

public interface UsersRepository extends JpaRepository<Users, Long> {
    Users findByEmail(String email);
    
    @Query("SELECT u.email FROM Users u WHERE u.id = :id")
    String findEmailById(@Param("id") Long id);
}