package com.example.model;

import java.time.LocalDateTime;

public class OTPDetails 
{
	 private String otp;
     private LocalDateTime expiresAt;

     public OTPDetails(String otp, LocalDateTime expiresAt) {
         this.otp = otp;
         this.expiresAt = expiresAt;
     }

     public String getOtp() {
         return otp;
     }

     public LocalDateTime getExpiresAt() {
         return expiresAt;
     }
 }


