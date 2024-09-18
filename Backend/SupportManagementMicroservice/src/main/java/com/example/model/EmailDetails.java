package com.example.model;

import java.time.LocalDateTime;

import com.example.model.Support.TicketStatus;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailDetails {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
    private String recipient;
    private String subject;
    private String msgBody;
    
    @ManyToOne
    @JoinColumn(name = "support_id")
    private Support support;

}

