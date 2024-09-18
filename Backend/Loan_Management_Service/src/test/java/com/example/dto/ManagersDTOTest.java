package com.example.dto;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class ManagersDTOTest {

    @Test
    public void testDefaultConstructor() {
        ManagersDTO manager = new ManagersDTO();

        assertNotNull(manager);
    }

    @Test
    public void testParameterizedConstructor() {
        long managerId = 1L;
        long userId = 2L;
        long vendorId = 3L;
        String assignedCustomers = "Customer1, Customer2";

        ManagersDTO manager = new ManagersDTO(managerId, userId, vendorId, assignedCustomers);

        assertEquals(managerId, manager.getManager_id());
        assertEquals(userId, manager.getUser_id());
        assertEquals(vendorId, manager.getVendor_id());
        assertEquals(assignedCustomers, manager.getAssigned_customers());
    }

    @Test
    public void testSettersAndGetters() {
        ManagersDTO manager = new ManagersDTO();

        long managerId = 1L;
        long userId = 2L;
        long vendorId = 3L;
        String assignedCustomers = "Customer1, Customer2";

        manager.setManager_id(managerId);
        manager.setUser_id(userId);
        manager.setVendor_id(vendorId);
        manager.setAssigned_customers(assignedCustomers);

        assertEquals(managerId, manager.getManager_id());
        assertEquals(userId, manager.getUser_id());
        assertEquals(vendorId, manager.getVendor_id());
        assertEquals(assignedCustomers, manager.getAssigned_customers());
    }
}
