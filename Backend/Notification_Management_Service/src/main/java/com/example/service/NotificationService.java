package com.example.service;

import com.example.exception.ResourceNotFoundException;
import com.example.model.Notification;
import com.example.model.Users;
import com.example.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public Notification getNotificationById(Long notificationId) throws ResourceNotFoundException {
        return notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found for this id :: " + notificationId));
    }

    public Notification createNotification(Notification notification) {
        notification.setCreatedAt(new Date());
        notification.setUpdatedAt(new Date());
        return notificationRepository.save(notification);
    }

    public Notification updateNotification(Long notificationId, Notification notificationDetails) throws ResourceNotFoundException {
        Notification notification = getNotificationById(notificationId);

        if (notificationDetails.getNotificationBody() != null) {
            notification.setNotificationBody(notificationDetails.getNotificationBody());
        }
        notification.setUpdatedAt(new Date());
        if (notificationDetails.getStatus() != null) {
            notification.setStatus(notificationDetails.getStatus());
        }

        return notificationRepository.save(notification);
    }


    public void deleteNotification(Long notificationId) throws ResourceNotFoundException {
        Notification notification = getNotificationById(notificationId);
        notificationRepository.delete(notification);
    }
    
    
}
