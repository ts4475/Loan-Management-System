//package com.example.controller;
//import com.example.model.Users;
//import com.example.service.UsersService;
//import com.example.exception.ResourceNotFoundException;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//import java.util.Optional;
//
//@CrossOrigin(origins = "*")
//@RestController
//@RequestMapping("/users")
//public class UsersController {
//    @Autowired
//    private UsersService usersService;
//    @GetMapping("/read")
//    public List<Users> read() {
//        return usersService.getAllUsers();
//    }
//    @GetMapping("/readOne/{id}")
//    public Users readOne(@PathVariable("id") long id) throws ResourceNotFoundException {
//        return usersService.getUsersById(id);
//    }
//    @PostMapping("/add")
//    public Users add(@RequestBody Users users) {
//        return usersService.addUsers(users);
//    }
//    @PutMapping("/update/{id}")
//    public void update(@RequestBody Users users, @PathVariable("id") long id) throws ResourceNotFoundException {
//    	usersService.updateUsers(id, users);
//    }
//    @DeleteMapping("/delete/{id}")
//    public void delete(@PathVariable("id") long id) throws ResourceNotFoundException {
//    	usersService.deleteUsers(id);
//    }
//    
//    
//    @PostMapping("/login")
//    public ResponseEntity<?> loginUser(@RequestBody Users user) {
//        Optional<Users> authenticatedUser = usersService.authenticate(user.getEmail(), user.getPassword());
//        if (authenticatedUser.isPresent()) {
//            return ResponseEntity.ok(authenticatedUser.get());
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//        }
//    }
//    
//    @PostMapping("/register")
//    public Users registerUser(@RequestBody Users user) {
//        user.setRole(Users.RoleEnum.CUSTOMER);
//        return usersService.addUsers(user);
//    }
//
//}

package com.example.controller;

import com.example.model.EmailDetails;
import com.example.model.OTPVerificationRequest;
import com.example.model.Users;
import com.example.service.EmailService;
import com.example.service.UsersService;
import com.example.dto.SecurityAnswerRequest;
import com.example.dto.UpdatePasswordRequest;
import com.example.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/users")
public class UsersController {
    @Autowired
    private UsersService usersService;
    
    @Autowired
    private EmailService emailService;

    @GetMapping("/read")
    public List<Users> read() {
        return usersService.getAllUsers();
    }

    @GetMapping("/readOne/{id}")
    public Users readOne(@PathVariable("id") long id) throws ResourceNotFoundException {
        return usersService.getUsersById(id);
    }

    @PostMapping("/add")
    public Users add(@RequestBody Users users) {
        return usersService.addUsers(users);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody Users users, @PathVariable("id") long id) throws ResourceNotFoundException {
        usersService.updateUsers(id, users);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable("id") long id) throws ResourceNotFoundException {
        usersService.deleteUsers(id);
    }

//    @PostMapping("/login")
//    public ResponseEntity<?> loginUser(@RequestBody Users user) {
//        Optional<Users> authenticatedUser = usersService.authenticate(user.getEmail(), user.getPassword());
//        if (authenticatedUser.isPresent()) {
//            return ResponseEntity.ok(authenticatedUser.get());
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
//        }
//    }

    @PostMapping("/register")
    public Users registerUser(@RequestBody Users user) {
        user.setRole(Users.RoleEnum.CUSTOMER);
        return usersService.addUsers(user);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Users user) {
        Optional<Users> authenticatedUser = usersService.authenticate(user.getEmail(), user.getPassword());
        if (authenticatedUser.isPresent()) {
            Users loggedInUser = authenticatedUser.get();
            if (loggedInUser.getRole() == Users.RoleEnum.CUSTOMER) {
                return ResponseEntity.ok(loggedInUser);
            } 
            
            else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("This email does not belong to a customer.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email or Password is wrong.");
        }
    }
    
    @PostMapping("/lo-login")
    public ResponseEntity<?> loLogin(@RequestBody Users user) {
        Optional<Users> authenticatedUser = usersService.authenticate(user.getEmail(), user.getPassword());
        if (authenticatedUser.isPresent()) {
            Users loggedInUser = authenticatedUser.get();
            if (loggedInUser.getRole() == Users.RoleEnum.LOAN_OFFICER) {
                return ResponseEntity.ok(loggedInUser);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("This email does not belong to an admin.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email or Password is wrong.");
        }
    }
    
    @PostMapping("/admin-login")
    public ResponseEntity<?> adminLogin(@RequestBody Users user) {
        Optional<Users> authenticatedUser = usersService.authenticate(user.getEmail(), user.getPassword());
        if (authenticatedUser.isPresent()) {
            Users loggedInUser = authenticatedUser.get();
            if (loggedInUser.getRole() == Users.RoleEnum.ADMIN) {
                return ResponseEntity.ok(loggedInUser);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("This email does not belong to an admin.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email or Password is wrong.");
        }
    }
    
    @PostMapping("/sendotp")
    public String
    sendMail(@RequestBody EmailDetails details)
    {
        String status
            = emailService.sendOtp(details);
 
        return status;
    }
    
    @PostMapping("/api/email/verifyotp")
    public String verifyOtp(@RequestBody OTPVerificationRequest request) {
    	try {
            System.out.println("Received OTP verification request for email: " + request.getEmail());
            boolean isValid = emailService.verifyOtp(request.getEmail(), request.getOtp());
            if (isValid) {
                System.out.println("OTP verified successfully for email: " + request.getEmail());
                return "OTP Verified Successfully";
            } else {
                System.out.println("Invalid OTP for email: " + request.getEmail());
                return "Invalid OTP";
            }
        } catch (Exception e) {
            e.printStackTrace(); // Print the stack trace for debugging
            return "Error occurred while verifying OTP: " + e.getMessage();
        }
    }
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    
    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOTP(@RequestBody EmailDetails emailDetails) {
        String status = emailService.sendOtp(emailDetails);
        return new ResponseEntity<>(status, HttpStatus.OK);
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<String> verifyOTP(@RequestBody OTPVerificationRequest otpVerificationRequest) {
        boolean isValid = emailService.verifyOtp(otpVerificationRequest.getEmail(), otpVerificationRequest.getOtp());
        if (isValid) {
            return new ResponseEntity<>("OTP Verified Successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invalid OTP", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/get-security-question")
    public ResponseEntity<String> getSecurityQuestion(@RequestBody EmailDetails emailDetails) {
        String question = usersService.getSecurityQuestion(emailDetails.getRecipient());
        if (question != null) {
            return new ResponseEntity<>(question, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No User exists with this Email Id", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/verify-security-answer")
    public ResponseEntity<String> verifySecurityAnswer(@RequestBody SecurityAnswerRequest securityAnswerRequest) {
        boolean isValid = usersService.verifySecurityAnswer(securityAnswerRequest.getEmail(), securityAnswerRequest.getAnswer());
        if (isValid) {
            return new ResponseEntity<>("Security Answer Verified Successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Security Answer Does not Match", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestBody UpdatePasswordRequest updatePasswordRequest) {
        boolean isUpdated = usersService.updatePassword(updatePasswordRequest.getEmail(), updatePasswordRequest.getNewPassword());
        if (isUpdated) {
            return new ResponseEntity<>("Password Reset Successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Error resetting password", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/login-otp")
    public ResponseEntity<?> loginWithOTP(@RequestBody OTPVerificationRequest otpRequest) {
        Optional<Users> user = usersService.verifyOtpAndLogin(otpRequest.getEmail(), otpRequest.getOtp());
        if (user != null) {
            return ResponseEntity.ok(user); // Return the user object upon successful verification
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect OTP");
        }
    }
    
    @GetMapping("/readEmail/{id}")
    public ResponseEntity<String> readEmail(@PathVariable("id") long id) {
        try {
            String email = usersService.getEmailById(id);
            return ResponseEntity.ok(email);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
    
    
}

