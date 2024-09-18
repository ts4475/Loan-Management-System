package com.example.service;

import com.example.model.Users;
import com.example.repository.UsersRepository;
import com.example.exception.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;
    
    @Autowired
    private EmailService emailService;
    
    
    private static final Logger logger = LoggerFactory.getLogger(UsersService.class);
    
    private BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    public List<Users> getAllUsers() {
        return usersRepository.findAll();
    }

    public Users getUsersById(long id) throws ResourceNotFoundException {
        return usersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for the ID: " + id));
    }

    public Users addUsers(Users users) {
    	BCryptPasswordEncoder bpe= 	new BCryptPasswordEncoder();
    	String newps=bpe.encode(users.getPassword());
    	users.setPassword(newps);
        return usersRepository.save(users);
    }

    public void updateUsers(long id, Users newUsers) throws ResourceNotFoundException {
        Users users = usersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for the ID: " + id));
        
        if (newUsers.getEmail() != null) {
            users.setEmail(newUsers.getEmail());
        }
        if (newUsers.getPassword() != null) {
        	BCryptPasswordEncoder bpe= 	new BCryptPasswordEncoder();
        	String newps=bpe.encode(newUsers.getPassword());
        	users.setPassword(newps);
        }
        if (newUsers.getFirst_name() != null) {
            users.setFirst_name(newUsers.getFirst_name());
        }
        if (newUsers.getLast_name() != null) {
            users.setLast_name(newUsers.getLast_name());
        }
        if (newUsers.getPhone() != null) {
            users.setPhone(newUsers.getPhone());
        }
        if (newUsers.getAddress() != null) {
            users.setAddress(newUsers.getAddress());
        }
        if (newUsers.getPin() != null) {
            users.setPin(newUsers.getPin() );
        }
        if (newUsers.getSecurityQuestion() != null) {
            users.setSecurityQuestion(newUsers.getSecurityQuestion());
        }
        if (newUsers.getSecurityAnswer() != null) {
            users.setSecurityAnswer(newUsers.getSecurityAnswer());
        }
        if (newUsers.getPan() != null) {
            users.setPan(newUsers.getPan());
        }
        if (newUsers.getDob() != null) {
            users.setDob(newUsers.getDob());
        }
        if (newUsers.getAnnualIncome() != 0) {
            users.setAnnualIncome(newUsers.getAnnualIncome());
        }
        if (newUsers.getRole() != null) {
            users.setRole(newUsers.getRole());
        }

        usersRepository.save(users);
    }

    public void deleteUsers(long id) throws ResourceNotFoundException {
        Users users = usersRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found for the ID: " + id));
        usersRepository.delete(users);
    }

    public Optional<Users> authenticate(String email, String password) {
    	BCryptPasswordEncoder bpe=new BCryptPasswordEncoder();
        Users user = usersRepository.findByEmail(email);
     
            if (bpe.matches(password, user.getPassword())) {
            	return Optional.of(user);
            }
            return Optional.empty();
    }
    
    public String getSecurityQuestion(String email) {
        Users user = usersRepository.findByEmail(email);
        if (user != null) {
            return user.getSecurityQuestion().name();
        } else {
            return null;
        }
    }

    public boolean verifySecurityAnswer(String email, String answer) {
        Users user = usersRepository.findByEmail(email);
        return user != null && user.getSecurityAnswer().equals(answer);
    }

    public boolean updatePassword(String email, String newPassword) {
        Users user = usersRepository.findByEmail(email);
        if (user != null) {
            user.setPassword(newPassword);
            BCryptPasswordEncoder bpe= 	new BCryptPasswordEncoder();
        	String newps=bpe.encode(user.getPassword());
        	user.setPassword(newps);
            usersRepository.save(user);
            return true;
        }
        return false;
    }
    
    public Optional<Users> verifyOtpAndLogin(String email, String otp) {
        boolean isVerified = emailService.verifyOtp(email, otp);
        if (isVerified) {
        	Optional<Users> userOptional = Optional.ofNullable(usersRepository.findByEmail(email));
            return Optional.ofNullable(userOptional.orElse(null)); // Return the user object if found
        }
         return Optional.ofNullable(null);// Return null if OTP verification fails
    }
    

    public String getEmailById(long id) throws ResourceNotFoundException {
        String email = usersRepository.findEmailById(id);
        if (email == null) {
            throw new ResourceNotFoundException("User not found for the ID: " + id);
        }
        return email;
    }
}
