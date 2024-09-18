package com.example.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Support {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long support_id;

    private String subject;
    private String description;
    private String reply = "";
    
    @Enumerated(EnumType.STRING)
    private TicketStatus ticket_status;

    private long customer_id;
    private long assigned_user_id;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
    private long loan_id;
    private String attachment_url;

    @PrePersist
    protected void onCreate() {
        created_at = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updated_at = LocalDateTime.now();
    }

    public enum TicketStatus {
        OPEN,
        CLOSE
    }
}
