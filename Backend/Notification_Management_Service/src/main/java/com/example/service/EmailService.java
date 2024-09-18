package com.example.service;

import com.example.exception.ResourceNotFoundException;
import com.example.model.Notification;
import com.example.model.Users;
import com.example.repository.NotificationRepository;
import com.example.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private UsersRepository userRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    public boolean sendEmail(Long userId, String notificationBody) {
        try {
            Users user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found for this id :: " + userId));

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user.getEmail());
            message.setSubject("Notification");
            message.setText(notificationBody);

            System.out.println("Sending email to: " + user.getEmail());
            emailSender.send(message);
            System.out.println("Email sent successfully to: " + user.getEmail());

            Notification notification = new Notification();
            notification.setNotificationBody(notificationBody);
            notification.setCreatedAt(new Date());
            notification.setUpdatedAt(new Date());
            notification.setStatus(Notification.Status.OPEN);
            notification.setUserId(userId);
            notificationRepository.save(notification);

            return true;
        
        } catch (ResourceNotFoundException resourceNotFoundException) {
            System.err.println("ResourceNotFoundException: " + resourceNotFoundException.getMessage());
            resourceNotFoundException.printStackTrace();
            return false;
        } catch (Exception e) {
            System.err.println("Exception: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }
}
