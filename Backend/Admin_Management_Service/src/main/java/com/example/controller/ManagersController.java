package com.example.controller;

import com.example.model.Managers;
import com.example.service.ManagersService;
import com.example.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/managers")
public class ManagersController {

    @Autowired
    private ManagersService managersService;

    @GetMapping("/read")
    public List<Managers> read() {
        return managersService.getAllManagers();
    }

    @GetMapping("/readOne/{id}")
    public Managers readOne(@PathVariable("id") long id) throws ResourceNotFoundException {
        return managersService.getManagerById(id);
    }

    @PostMapping("/add")
    public Managers add(@RequestBody Managers manager) {
        return managersService.addManager(manager);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody Managers manager, @PathVariable("id") long id) throws ResourceNotFoundException {
        managersService.updateManager(id, manager);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") long id) throws ResourceNotFoundException {
        managersService.deleteManager(id);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<Managers> getManagerByUserId(@PathVariable("userId") Long userId) {
        Managers manager = managersService.findByUserId(userId);
        return ResponseEntity.ok(manager);
    }
    
    @GetMapping("/vendor/{vendorId}")
    public ResponseEntity<Managers> getManagerByVendorId(@PathVariable("vendorId") Long vendorId) {
        Managers manager = managersService.getManagerByVendorId(vendorId);
        if (manager == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(manager);
        }
    }

}
