package com.example.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

public class ManagersTests {

    private Managers manager;

    @BeforeEach
    public void setUp() {
        manager = new Managers(1L, new Users(), new Vendors(), "[]", LocalDateTime.now(), LocalDateTime.now());
    }

    @Test
    public void testManagerAttributes() {
        assertEquals(1L, manager.getManager_id());
        assertNotNull(manager.getUser());
        assertNotNull(manager.getVendor());
        assertEquals("[]", manager.getAssigned_customers());
        assertNotNull(manager.getCreated_at());
        assertNotNull(manager.getUpdated_at());
    }

    @Test
    public void testManagerTimestamps() {
        manager.onCreate();
        assertNotNull(manager.getCreated_at());

        manager.onUpdate();
        assertNotNull(manager.getUpdated_at());
    }

    @Test
    public void testSetters() {
        Users newUser = new Users();
        manager.setUser(newUser);
        assertEquals(newUser, manager.getUser());

        Vendors newVendor = new Vendors();
        manager.setVendor(newVendor);
        assertEquals(newVendor, manager.getVendor());

        manager.setAssigned_customers("[1,2,3]");
        assertEquals("[1,2,3]", manager.getAssigned_customers());

        LocalDateTime newTime = LocalDateTime.now();
        manager.setCreated_at(newTime);
        assertEquals(newTime, manager.getCreated_at());

        manager.setUpdated_at(newTime);
        assertEquals(newTime, manager.getUpdated_at());
    }
}
