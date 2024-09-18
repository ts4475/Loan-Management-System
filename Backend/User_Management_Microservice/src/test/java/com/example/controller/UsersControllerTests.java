package com.example.controller;

import com.example.model.Users;
import com.example.service.UsersService;
import com.example.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UsersControllerTests {

    @Mock
    private UsersService usersService;

    @InjectMocks
    private UsersController usersController;

    private Users user;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new Users();
        user.setUser_id(1L);
        user.setEmail("test@example.com");
        user.setPassword("password");
        user.setRole(Users.RoleEnum.CUSTOMER); // Ensure role is set to CUSTOMER for successful login test
    }

    @Test
    public void testRead() {
        List<Users> usersList = Arrays.asList(user);
        when(usersService.getAllUsers()).thenReturn(usersList);

        List<Users> result = usersController.read();

        assertEquals(1, result.size());
        assertEquals("test@example.com", result.get(0).getEmail());
    }

    @Test
    public void testReadOne() throws ResourceNotFoundException {
        when(usersService.getUsersById(1L)).thenReturn(user);

        Users result = usersController.readOne(1L);

        assertEquals("test@example.com", result.getEmail());
    }

    @Test
    public void testAdd() {
        when(usersService.addUsers(user)).thenReturn(user);

        Users result = usersController.add(user);

        assertEquals("test@example.com", result.getEmail());
    }

    @Test
    public void testUpdate() throws ResourceNotFoundException {
        doNothing().when(usersService).updateUsers(1L, user);

        usersController.update(user, 1L);

        verify(usersService, times(1)).updateUsers(1L, user);
    }

    @Test
    public void testDelete() throws ResourceNotFoundException {
        doNothing().when(usersService).deleteUsers(1L);

        usersController.delete(1L);

        verify(usersService, times(1)).deleteUsers(1L);
    }

    @Test
    public void testRegisterUser() {
        when(usersService.addUsers(user)).thenReturn(user);

        Users result = usersController.registerUser(user);

        assertEquals("test@example.com", result.getEmail());
        assertEquals(Users.RoleEnum.CUSTOMER, result.getRole());
    }

    @Test
    public void testLoginUserSuccess() {
        when(usersService.authenticate("test@example.com", "password")).thenReturn(Optional.of(user));

        ResponseEntity<?> response = usersController.loginUser(user);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(user, response.getBody());
    }

    @Test
    public void testLoginUserFailure() {
        when(usersService.authenticate("test@example.com", "password")).thenReturn(Optional.empty());

        ResponseEntity<?> response = usersController.loginUser(user);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Email or Password is wrong.", response.getBody());
    }

    @Test
    public void testLoginUserNonCustomer() {
        user.setRole(Users.RoleEnum.ADMIN);
        when(usersService.authenticate("test@example.com", "password")).thenReturn(Optional.of(user));

        ResponseEntity<?> response = usersController.loginUser(user);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("This email does not belong to a customer.", response.getBody());
    }
}
