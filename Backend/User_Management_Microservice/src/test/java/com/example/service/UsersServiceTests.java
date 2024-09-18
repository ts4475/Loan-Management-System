package com.example.service;

import com.example.model.Users;
import com.example.repository.UsersRepository;
import com.example.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UsersServiceTests {

    @Mock
    private UsersRepository usersRepository;

    @InjectMocks
    private UsersService usersService;

    private Users user;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new Users();
        user.setUser_id(1L);
        user.setEmail("test@example.com");
        user.setPassword("password");
        user.setFirst_name("John");
        user.setLast_name("Doe");
        user.setPhone("1234567890");
        user.setAddress("123 Main St");
        user.setPin("123456");
        user.setSecurityQuestion(Users.SecurityQuestion.FIRST_SCHOOL);
        user.setSecurityAnswer("Test School");
        user.setPan("ABCDE1234F");
        user.setDob(LocalDate.of(1990, 1, 1));
        user.setAnnualIncome(100000);
        user.setRole(Users.RoleEnum.CUSTOMER);
    }

    @Test
    public void testGetAllUsers() {
        List<Users> usersList = Arrays.asList(user);
        when(usersRepository.findAll()).thenReturn(usersList);

        List<Users> result = usersService.getAllUsers();

        assertEquals(1, result.size());
        assertEquals("test@example.com", result.get(0).getEmail());
    }

    @Test
    public void testGetUsersById() throws ResourceNotFoundException {
        when(usersRepository.findById(1L)).thenReturn(Optional.of(user));

        Users result = usersService.getUsersById(1L);

        assertEquals("test@example.com", result.getEmail());
    }

    @Test
    public void testGetUsersByIdNotFound() {
        when(usersRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            usersService.getUsersById(1L);
        });
    }

    @Test
    public void testAddUsers() {
        when(usersRepository.save(user)).thenReturn(user);

        Users result = usersService.addUsers(user);

        assertEquals("test@example.com", result.getEmail());
    }

    @Test
    public void testUpdateUsers() throws ResourceNotFoundException {
        when(usersRepository.findById(1L)).thenReturn(Optional.of(user));
        when(usersRepository.save(user)).thenReturn(user);

        Users newUser = new Users();
        newUser.setEmail("new@example.com");
        newUser.setPassword("newpassword");
        newUser.setFirst_name("Jane");
        newUser.setLast_name("Smith");
        newUser.setPhone("0987654321");
        newUser.setAddress("456 Another St");
        newUser.setPin("654321");
        newUser.setSecurityQuestion(Users.SecurityQuestion.FAVOURITE_FOOD);
        newUser.setSecurityAnswer("Pizza");
        newUser.setPan("XYZ9876543");
        newUser.setDob(LocalDate.of(1985, 5, 5));
        newUser.setAnnualIncome(200000);
        newUser.setRole(Users.RoleEnum.ADMIN);

        usersService.updateUsers(1L, newUser);

        assertEquals("new@example.com", user.getEmail());
        assertEquals("newpassword", user.getPassword());
        assertEquals("Jane", user.getFirst_name());
        assertEquals("Smith", user.getLast_name());
        assertEquals("0987654321", user.getPhone());
        assertEquals("456 Another St", user.getAddress());
        assertEquals("654321", user.getPin());
        assertEquals(Users.SecurityQuestion.FAVOURITE_FOOD, user.getSecurityQuestion());
        assertEquals("Pizza", user.getSecurityAnswer());
        assertEquals("XYZ9876543", user.getPan());
        assertEquals(LocalDate.of(1985, 5, 5), user.getDob());
        assertEquals(200000, user.getAnnualIncome());
        assertEquals(Users.RoleEnum.ADMIN, user.getRole());

        verify(usersRepository, times(1)).save(user);
    }

    @Test
    public void testUpdateUsersNotFound() {
        when(usersRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            usersService.updateUsers(1L, user);
        });
    }

    @Test
    public void testDeleteUsers() throws ResourceNotFoundException {
        when(usersRepository.findById(1L)).thenReturn(Optional.of(user));
        doNothing().when(usersRepository).delete(user);

        usersService.deleteUsers(1L);

        verify(usersRepository, times(1)).delete(user);
    }

    @Test
    public void testDeleteUsersNotFound() {
        when(usersRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            usersService.deleteUsers(1L);
        });
    }

    @Test
    public void testAuthenticateSuccess() {
        when(usersRepository.findByEmail("test@example.com")).thenReturn(user);

        Optional<Users> result = usersService.authenticate("test@example.com", "password");

        assertTrue(result.isPresent());
        assertEquals("test@example.com", result.get().getEmail());
    }

    @Test
    public void testAuthenticateFailure() {
        when(usersRepository.findByEmail("test@example.com")).thenReturn(user);

        Optional<Users> result = usersService.authenticate("test@example.com", "wrongpassword");

        assertTrue(result.isEmpty());
    }

    @Test
    public void testAuthenticateUserNotFound() {
        when(usersRepository.findByEmail("test@example.com")).thenReturn(null);

        Optional<Users> result = usersService.authenticate("test@example.com", "password");

        assertTrue(result.isEmpty());
    }
}
