// Java Program to Illustrate Creation Of
// Service implementation class

package com.example.service;

// Importing required classes
import com.example.model.EmailDetails;
import com.example.model.OTPDetails;

import java.io.File;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

// Annotation
@Service
// Class
// Implementing EmailService interface
public class EmailService {

	@Autowired private JavaMailSender javaMailSender;

	@Value("${spring.mail.username}") 
	private String sender;
	
	 // In-memory store for OTPs
	private Map<String, OTPDetails> otpStorage = new HashMap<>(); //new

	// Method 1
	// To send a simple email
	public String sendSimpleMail(EmailDetails details)
	{

		// Try block to check for exceptions
		try {

			// Creating a simple mail message
			SimpleMailMessage mailMessage= new SimpleMailMessage();

			// Setting up necessary details
			mailMessage.setFrom(sender);
			mailMessage.setTo(details.getRecipient());
			mailMessage.setText(details.getMsgBody());
			mailMessage.setSubject(details.getSubject());

			// Sending the mail
			javaMailSender.send(mailMessage);
			return "Mail Sent Successfully...";
		}

		// Catch block to handle the exceptions
		catch (Exception e) {
			return "Error while Sending Mail";
		}
	}

	// Method 2
	// To send an email with attachment
	public String
	sendMailWithAttachment(EmailDetails details)
	{
		// Creating a mime message
		MimeMessage mimeMessage= javaMailSender.createMimeMessage();
		MimeMessageHelper mimeMessageHelper;

		try {

			// Setting multipart as true for attachments to
			// be send
			mimeMessageHelper= new MimeMessageHelper(mimeMessage, true);
			mimeMessageHelper.setFrom(sender);
			mimeMessageHelper.setTo(details.getRecipient());
			mimeMessageHelper.setText(details.getMsgBody());
			mimeMessageHelper.setSubject(
				details.getSubject());

			// Adding the attachment
			FileSystemResource file= new FileSystemResource(new File(details.getAttachment()));

			mimeMessageHelper.addAttachment(file.getFilename(), file);

			// Sending the mail
			javaMailSender.send(mimeMessage);
			return "Mail sent Successfully";
		}

		// Catch block to handle MessagingException
		catch (MessagingException e) {

			// Display message when exception occurred
			return "Error while sending mail!!!";
		}
	}
	
	public String sendOtp(EmailDetails details)
	{
		Random randomMethod =new Random();
//		EmailDetails emailDetails = new EmailDetails();
//		emailDetails.setRecipient(details.getRecipient());
		String numbers = "0123456789";
		  
	    char[] otp = new char[6];
 
	    for (int i = 0; i < 6; i++)
	    {
	        // Use of charAt() method : to get character value
	        // Use of nextInt() as it is scanning the value as int
	        otp[i] = numbers.charAt(randomMethod.nextInt(numbers.length()));
	    }
	    
	    String generatedOtp = String.valueOf(otp);

        // Store the OTP with expiration time (e.g., 5 minutes)
        LocalDateTime expiresAt = LocalDateTime.now().plus(5, ChronoUnit.MINUTES);
        otpStorage.put(details.getRecipient(), new OTPDetails(generatedOtp, expiresAt));
	    
	    details.setMsgBody("Hello your OTP is "+ generatedOtp);
	    details.setSubject("OTP for verify Email");
		String status = sendSimpleMail(details);
		
		if ("Mail Sent Successfully...".equals(status)) {
	        return "OTP sent successfully to " + details.getRecipient();
	    } else {
	        return "Failed to send OTP to " + details.getRecipient();
	    }
	}
	
	public boolean verifyOtp(String email, String otp) {
        OTPDetails storedOtpDetails = otpStorage.get(email);

        if (storedOtpDetails != null 
            && storedOtpDetails.getOtp().equals(otp) 
            && LocalDateTime.now().isBefore(storedOtpDetails.getExpiresAt())) {
            otpStorage.remove(email); // Optionally remove OTP after successful verification
            return true;
        }
        return false;
    }
}
    