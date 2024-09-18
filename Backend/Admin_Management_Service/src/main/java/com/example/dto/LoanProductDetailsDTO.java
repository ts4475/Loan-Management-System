package com.example.dto;
 
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
 
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoanProductDetailsDTO {
    private float product_interest_rate;
    private int product_prepayment_charge;
}