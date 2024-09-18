package com.example.service;



import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.dto.LoanApplicationDTO;
import com.example.dto.LoanProductDetailsDTO;
import com.example.dto.ManagersDTO;
import com.example.dto.UserDTO;
import com.example.exception.InvalidLoanApplicationException;
import com.example.exception.LoanNotFoundException;
import com.example.model.Loan;
import com.example.repository.LoanRepository;

import jakarta.persistence.Column;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;

@Service
public class LoanService {

	private final LoanRepository loanRepository;
	private RepaymentService repaymentService;

    
    public LoanService(LoanRepository loanRepository, RepaymentService repaymentService) {
        this.loanRepository = loanRepository;
        this.repaymentService = repaymentService;
    }

    @Autowired
    private RestTemplate restTemplate;

    private static final String LOAN_APPLICATION_SERVICE_URL = "http://localhost:8083/loan-applications/readOne/";
    private static final String USER_MANAGEMENT_SERVICE_URL = "http://localhost:8082/users/readOne/";
    private static final String ADMIN_MANAGEMENT_SERVICE_URL = "http://localhost:8084/";
    private static final BigDecimal LATE_FEE = new BigDecimal("50.00");

    @Transactional
    public Loan createLoan(Long loanApp_id) {
        LoanApplicationDTO loanApplication = validateLoanApplicationId(loanApp_id);

        Loan loan = new Loan();
        loan.setLoanApplication(loanApplication.getApplicationId());
        loan.setCustomerId(loanApplication.getUser().getUserId());
        loan.setAmount(BigDecimal.valueOf(loanApplication.getAmountRequired()));

        // Fetch the loan product details based on the product ID from the loan application
        LoanProductDetailsDTO loanProductDetails = loanApplication.getProduct();
        BigDecimal interestRate = BigDecimal.valueOf(loanProductDetails.getProductInterestRate());
        BigDecimal prePaymentFee = BigDecimal.valueOf(loanProductDetails.getProductPrepaymentCharge());

        loan.setInterestRate(interestRate);
        loan.setPrePaymentFee(prePaymentFee);
        loan.setLateFee(LATE_FEE);

        // Calculate the interest amount
        BigDecimal principal = loan.getAmount();
        
        //BigDecimal interest = principal.multiply(interestRate).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);

        // Calculate the repayable amount by adding the principal and interest
        BigDecimal repayableAmount = principal.add(principal.multiply(interestRate.divide(BigDecimal.valueOf(100))));
        loan.setRepayableAmount(repayableAmount);
        loan.setStartDate(LocalDate.now());
        loan.setEndDate(LocalDate.now().plusYears(1));
        int tenureInYears = (int) ChronoUnit.YEARS.between(loan.getStartDate(), loan.getEndDate());
        
        BigDecimal emiAmount = repaymentService.calculateEMI(principal, loan.getInterestRate(), tenureInYears);
        
        loan.setEMIAmount(emiAmount);

        ManagersDTO manager = getManagerByVendorId(loanApplication.getVendor().getVendorId());
        loan.setLoanManagerId(manager.getManager_id());

        // Set other required fields
        loan.setStatus(Loan.LoanStatus.active); 
        // Assuming the status is approved

        // Assuming start date is now and end date is one year from now
        
        loan.setRepaymentFrequency(Loan.RepaymentFrequency.MONTHLY);

        validateCustomerId(loan.getCustomerId());
        Loan savedLoan = loanRepository.save(loan);
        return savedLoan;
    }
    

    private ManagersDTO getManagerByVendorId(Long vendorId) {
        String url = ADMIN_MANAGEMENT_SERVICE_URL+ "managers/vendor/" + vendorId;
        return restTemplate.getForObject(url, ManagersDTO.class);
    }

    @Transactional
    public Loan updateLoan(Long loanId, Loan updatedLoanDetails) {
        Optional<Loan> existingLoanOpt = loanRepository.findById(loanId);
        if (existingLoanOpt.isPresent()) {
            Loan existingLoan = existingLoanOpt.get();
            existingLoan.setAmount(updatedLoanDetails.getAmount());
            existingLoan.setInterestRate(updatedLoanDetails.getInterestRate());
            existingLoan.setStatus(updatedLoanDetails.getStatus());
            existingLoan.setRepaymentFrequency(updatedLoanDetails.getRepaymentFrequency());
            existingLoan.setStartDate(updatedLoanDetails.getStartDate());
            existingLoan.setEndDate(updatedLoanDetails.getEndDate());
            Loan updatedLoan = loanRepository.save(existingLoan);
            return updatedLoan;
            
        } else {
            throw new LoanNotFoundException("Loan with ID " + loanId + " not found");
        }
    }

    public Loan getLoanById(Long loanId) {
        return loanRepository.findById(loanId)
                .orElseThrow(() -> new LoanNotFoundException("Loan with ID " + loanId + " not found"));
    }

    public List<Loan> getLoansByCustomerId(Long customerId) {
        return loanRepository.findByCustomerId(customerId);
    }

    public List<Loan> getAllLoans() {
        return loanRepository.findAll();
    }

    public LoanApplicationDTO validateLoanApplicationId(long applicationId) {
        String url = LOAN_APPLICATION_SERVICE_URL + applicationId;
        LoanApplicationDTO loanApplication = restTemplate.getForObject(url, LoanApplicationDTO.class);

        if (loanApplication == null) {
            throw new IllegalArgumentException("Loan application not found for ID: " + applicationId);
        }

        return loanApplication;
    }


    public void validateCustomerId(long customerId) {
        String url = USER_MANAGEMENT_SERVICE_URL + customerId;
        UserDTO user = restTemplate.getForObject(url, UserDTO.class);
        if (user == null) {
            throw new InvalidLoanApplicationException("Invalid customer ID: " + customerId);
        }
    }
    
    public void deleteLoanById(Long id) {
        if (loanRepository.existsById(id)) {
            loanRepository.deleteById(id);
        } else {
            throw new LoanNotFoundException("Loan with ID " + id + " not found");
        } 
    }
    
//    private BigDecimal calculateEMI(BigDecimal totalRepayableAmount, BigDecimal annualInterestRate, int tenureInYears) {
//        MathContext mc = new MathContext(10, RoundingMode.HALF_UP);
//        BigDecimal monthlyRate = annualInterestRate.divide(BigDecimal.valueOf(12 * 100), mc);
//        int numPayments = tenureInYears * 12;
//        BigDecimal onePlusRate = BigDecimal.ONE.add(monthlyRate, mc);
//        BigDecimal denominator = onePlusRate.pow(numPayments, mc).subtract(BigDecimal.ONE, mc);
//        BigDecimal emi = totalRepayableAmount.multiply(monthlyRate, mc).multiply(onePlusRate.pow(numPayments, mc)).divide(denominator, mc);
//        return emi;
//    }
    
    
    
}
