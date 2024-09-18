package com.example.service;

import com.example.exception.ResourceNotFoundException;
import com.example.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UsersService {

    @Autowired
    private RestTemplate restTemplate;

    private final String USER_SERVICE_URL = "http://localhost:8082/users/readOne/";

    public Users getUserById(Long userId) throws ResourceNotFoundException {
        Users user = restTemplate.getForObject(USER_SERVICE_URL + userId, Users.class);
        if (user == null) {
            throw new ResourceNotFoundException("User not found for this id :: " + userId);
        }
        return user;
    }
}
