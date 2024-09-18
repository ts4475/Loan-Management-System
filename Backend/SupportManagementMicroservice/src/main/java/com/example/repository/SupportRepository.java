package com.example.repository;

import com.example.model.Support;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SupportRepository extends JpaRepository<Support, Long> {
	 @Query("SELECT s FROM Support s WHERE s.assigned_user_id = :assignedUserId AND s.ticket_status = :ticketStatus")
	   List<Support> findByAssignedUserIdAndTicketStatus(@Param("assignedUserId") long assignedUserId, @Param("ticketStatus") Support.TicketStatus ticketStatus);
	 
	 @Query("SELECT s FROM Support s WHERE s.customer_id = :customerId AND s.ticket_status = :ticketStatus")
	    List<Support> findByCustomerIdAndTicketStatus(@Param("customerId") long customerId, @Param("ticketStatus") Support.TicketStatus ticketStatus);
}
