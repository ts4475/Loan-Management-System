//package com.example.service;
//
//import com.example.exception.ResourceNotFoundException;
//import com.example.model.Managers;
//import com.example.repository.ManagersRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class ManagersService {
//
//    @Autowired
//    private ManagersRepository managersRepository;
//
//    public List<Managers> getAllManagers() {
//        return managersRepository.findAll();
//    }
//
//    public Managers getManagerById(long id) throws ResourceNotFoundException {
//        return managersRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Manager not found for the ID: " + id));
//    }
//
//    public Managers addManager(Managers manager) {
//        return managersRepository.save(manager);
//    }
//
//    public void updateManager(long id, Managers newManager) throws ResourceNotFoundException {
//        Managers manager = managersRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Manager not found for the ID: " + id));
//
//        manager.setUser(newManager.getUser());
//        manager.setVendor(newManager.getVendor());
//        manager.setAssigned_customers(newManager.getAssigned_customers());
//
//        managersRepository.save(manager);
//    }
//
//    public void deleteManager(long id) throws ResourceNotFoundException {
//        Managers manager = managersRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("Manager not found for the ID: " + id));
//        managersRepository.delete(manager);
//    }
//}

package com.example.service;

import com.example.exception.ResourceNotFoundException;
import com.example.model.Managers;
import com.example.model.Users;
import com.example.repository.ManagersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class ManagersService {

    @Autowired
    private ManagersRepository managersRepository;

    @Autowired
    private RestTemplate restTemplate;

    private final String USER_SERVICE_URL = "http://localhost:8082/users/readOne/";

    public List<Managers> getAllManagers() {
        return managersRepository.findAll();
    }

    public Managers getManagerById(long id) throws ResourceNotFoundException {
        return managersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Manager not found for the ID: " + id));
    }

    public Managers addManager(Managers manager) {
        Users user = restTemplate.getForObject(USER_SERVICE_URL + manager.getUser().getUser_id(), Users.class);
        if (user == null) {
            throw new RuntimeException("User not found with ID: " + manager.getUser().getUser_id());
        }
        manager.setUser(user);
        return managersRepository.save(manager);
    }

    public void updateManager(long id, Managers newManager) throws ResourceNotFoundException {
        Managers manager = managersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Manager not found for the ID: " + id));

        Users user = restTemplate.getForObject(USER_SERVICE_URL + newManager.getUser().getUser_id(), Users.class);
        if (user == null) {
            throw new RuntimeException("User not found with ID: " + newManager.getUser().getUser_id());
        }
        manager.setUser(user);
        manager.setVendor(newManager.getVendor());
        manager.setAssigned_customers(newManager.getAssigned_customers());

        managersRepository.save(manager);
    }

    public void deleteManager(long id) throws ResourceNotFoundException {
        Managers manager = managersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Manager not found for the ID: " + id));
        managersRepository.delete(manager);
    }
    
    public Managers findByUserId(Long userId) {
        return managersRepository.findByUserUserId(userId);
    }
    
    public Managers getManagerByVendorId(Long vendorId) {
        Optional<Managers> managerOptional = managersRepository.findByVendorVendorId(vendorId);
        return managerOptional.orElse(null);
    }
}

