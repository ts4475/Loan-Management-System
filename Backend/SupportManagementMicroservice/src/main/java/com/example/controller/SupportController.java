package com.example.controller;

import com.example.model.EmailDetails;
import com.example.model.Support;
import com.example.service.SupportService;
import com.example.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/supports")
public class SupportController {
    @Autowired
    private SupportService supportService;

    @GetMapping("/read")
    public List<Support> read() {
        return supportService.getAllSupports();
    }

    @GetMapping("/readOne/{id}")
    public Support readOne(@PathVariable("id") long id) throws ResourceNotFoundException {
        return supportService.getSupportById(id);
    }

    @PostMapping("/add")
    public Support add(@RequestBody Support support) {
        return supportService.addSupport(support);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody Support support, @PathVariable("id") long id) throws ResourceNotFoundException {
        supportService.updateSupport(id, support);
    }

    @PatchMapping("/partial-update/{id}")
    public void partialUpdate(@RequestBody Support support, @PathVariable("id") long id) throws ResourceNotFoundException {
        supportService.partialUpdateSupport(id, support);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") long id) throws ResourceNotFoundException {
        supportService.deleteSupport(id);
    }
    
    @GetMapping("/open/{userId}")
    public List<Support> getOpenTickets(@PathVariable("userId") long userId) {
        return supportService.getOpenTickets(userId);
    }

    @GetMapping("/closed/{userId}")
    public List<Support> getClosedTickets(@PathVariable("userId") long userId) {
        return supportService.getClosedTickets(userId);
    }
    
    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody EmailDetails emailDetails) {
        supportService.sendEmail(emailDetails);
        return ResponseEntity.ok("Email sent successfully");
    }
    
    @GetMapping("/open-cust/{customerId}")
    public List<Support> getOpenTicketsCustomer(@PathVariable("customerId") long userId) {
        return supportService.getOpenTicketsCustomer(userId);
    }

    @GetMapping("/closed-cust/{customerId}")
    public List<Support> getClosedTicketsCustomer(@PathVariable("customerId") long userId) {
        return supportService.getClosedTicketsCustomer(userId);
    }

}


