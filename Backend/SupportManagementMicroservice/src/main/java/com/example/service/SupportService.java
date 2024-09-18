package com.example.service;

import com.example.model.EmailDetails;
import com.example.model.Support;
import com.example.repository.EmailDetailsRepository;
import com.example.repository.SupportRepository;
import com.example.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupportService {
    @Autowired
    private SupportRepository supportRepository;
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private EmailDetailsRepository emailDetailsRepository;


    public List<Support> getAllSupports() {
        return supportRepository.findAll();
    }

    public Support getSupportById(long id) throws ResourceNotFoundException {
        return supportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Support ticket not found for the ID: " + id));
    }

    public Support addSupport(Support support) {
        return supportRepository.save(support);
    }

    public void updateSupport(long id, Support newSupport) throws ResourceNotFoundException {
        Support support = supportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Support ticket not found for the ID: " + id));

        support.setSubject(newSupport.getSubject());
        support.setDescription(newSupport.getDescription());
        support.setReply(newSupport.getReply());
        support.setTicket_status(newSupport.getTicket_status());
        support.setCustomer_id(newSupport.getCustomer_id());
        support.setAssigned_user_id(newSupport.getAssigned_user_id());
        support.setLoan_id(newSupport.getLoan_id());
        support.setAttachment_url(newSupport.getAttachment_url());

        supportRepository.save(support);
    }

    public void partialUpdateSupport(long id, Support newSupport) throws ResourceNotFoundException {
        Support support = supportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Support ticket not found for the ID: " + id));

        if (newSupport.getSubject() != null) {
            support.setSubject(newSupport.getSubject());
        }
        if (newSupport.getDescription() != null) {
            support.setDescription(newSupport.getDescription());
        }
        if (newSupport.getReply() != null) {
            support.setReply(newSupport.getReply());
        }
        if (newSupport.getTicket_status() != null) {
            support.setTicket_status(newSupport.getTicket_status());
        }
        if (newSupport.getCustomer_id() != 0) {
            support.setCustomer_id(newSupport.getCustomer_id());
        }
        if (newSupport.getAssigned_user_id() != 0) {
            support.setAssigned_user_id(newSupport.getAssigned_user_id());
        }
        if (newSupport.getLoan_id() != 0) {
            support.setLoan_id(newSupport.getLoan_id());
        }
        if (newSupport.getAttachment_url() != null) {
            support.setAttachment_url(newSupport.getAttachment_url());
        }

        supportRepository.save(support);
    }

    public void deleteSupport(long id) throws ResourceNotFoundException {
        Support support = supportRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Support ticket not found for the ID: " + id));
        supportRepository.delete(support);
    }
    
    public List<Support> getOpenTickets(long userId) {
        return supportRepository.findByAssignedUserIdAndTicketStatus(userId, Support.TicketStatus.OPEN);
    }

    public List<Support> getClosedTickets(long userId) {
        return supportRepository.findByAssignedUserIdAndTicketStatus(userId, Support.TicketStatus.CLOSE);
    }
    
    public void sendEmail(EmailDetails emailDetails) {
    	
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(emailDetails.getRecipient());
        message.setSubject(emailDetails.getSubject());
        message.setText(emailDetails.getMsgBody());
        mailSender.send(message);
        
        emailDetailsRepository.save(emailDetails);
    }
    
    public List<Support> getOpenTicketsCustomer(long userId) {
        return supportRepository.findByCustomerIdAndTicketStatus(userId, Support.TicketStatus.OPEN);
    }
    
    public List<Support> getClosedTicketsCustomer(long userId) {
        return supportRepository.findByCustomerIdAndTicketStatus(userId, Support.TicketStatus.CLOSE);
    }
}


