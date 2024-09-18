package com.example.controller;

import com.example.exception.ResourceNotFoundException;
import com.example.model.Notification;
import com.example.service.NotificationService;
import com.example.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private EmailService emailService;

    @GetMapping("/read")
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @GetMapping("/readOne/{id}")
    public Notification getNotificationById(@PathVariable(value = "id") Long notificationId) throws ResourceNotFoundException {
        return notificationService.getNotificationById(notificationId);
    }

    @PostMapping("/add")
    public Notification createNotification(@RequestBody Notification notification) {
        return notificationService.createNotification(notification);
    }

    @PutMapping("/update/{id}")
    public Notification updateNotification(@PathVariable(value = "id") Long notificationId, @RequestBody Notification notificationDetails) throws ResourceNotFoundException {
        return notificationService.updateNotification(notificationId, notificationDetails);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteNotification(@PathVariable(value = "id") Long notificationId) throws ResourceNotFoundException {
        notificationService.deleteNotification(notificationId);
        return ResponseEntity.ok().build();
    }

//    @PostMapping("/send-email")
//    public ResponseEntity<String> sendEmail(@RequestParam Long userId, @RequestParam String notificationBody) {
//        boolean isSent = emailService.sendEmail(userId, notificationBody);
//        if (isSent) {
//            return ResponseEntity.ok("Email sent successfully");
//        } else {
//            return ResponseEntity.status(500).body("Failed to send email");
//        }
//    }
    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestParam Long userId, @RequestParam String notificationBody) {
        boolean isSent = emailService.sendEmail(userId, notificationBody);
        if (isSent) {
            return ResponseEntity.ok("Email sent successfully");
        } else {
            System.err.println("Failed to send email for user ID: " + userId);
            return ResponseEntity.status(500).body("Failed to send email");
        }
    }
}
