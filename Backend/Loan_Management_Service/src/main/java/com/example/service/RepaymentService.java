package com.example.service;



import com.example.dto.UserDTO;
import com.example.model.EmailDetails;
import com.example.model.Loan;
import com.example.model.Repayment;
import com.example.model.Repayment.RepaymentStatus;
import com.example.model.Transaction;
import com.example.model.TransactionType;
import com.example.repository.LoanRepository;
import com.example.repository.RepaymentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class RepaymentService {
	

	private final RepaymentRepository repaymentRepository;
    private final TransactionService transactionService;
    private final LoanRepository loanRepository;

    public RepaymentService(RepaymentRepository repaymentRepository, TransactionService transactionService, LoanRepository loanRepository) {
        this.repaymentRepository = repaymentRepository;
        this.transactionService = transactionService;
        this.loanRepository = loanRepository;
    }
    
    @Autowired
    private JavaMailSender mailSender;
    
    @Autowired
    private RestTemplate restTemplate;
    
    private static final String USER_MANAGEMENT_SERVICE_URL = "http://localhost:8082/users/readEmail/";
    
   
    public List<Repayment> getRepaymentsByLoanId(Long loanId) {
        return repaymentRepository.findByLoanId(loanId);
    }
    
    public Repayment findRepaymentById(Long repaymentId) {
        return repaymentRepository.findById(repaymentId).orElse(null);
    }

    public Repayment createRepayment(Long loanId) {
        Loan loan = loanRepository.findByLoanId(loanId);
        if (loan == null) {
            throw new RuntimeException("Loan must not be null");
        }

        Repayment repayment = new Repayment();
        repayment.setLoan(loan);
        repayment.setRepaymentDate(LocalDateTime.now());
        repayment.setStatus(RepaymentStatus.COMPLETED);
        
        

     // Calculate repayment amount (EMI amount)
        BigDecimal repaymentAmount = calculateEMIAmount(loanId);
        
        // Ensure EMI is not more than repayable amount
        if (repaymentAmount.compareTo(loan.getRepayableAmount()) > 0) {
            repaymentAmount = loan.getRepayableAmount();
        }

        repayment.setAmount(repaymentAmount);

        // Reduce the loan's repayable amount by the repayment amount
        BigDecimal newRepayableAmount = loan.getRepayableAmount().subtract(repayment.getAmount());
        loan.setRepayableAmount(newRepayableAmount);
        
        if (newRepayableAmount.compareTo(BigDecimal.ZERO) == 0) {
            loan.setStatus(Loan.LoanStatus.paid_off);
        }
        loanRepository.save(loan);
        
       

        // Create and save transaction
        BigDecimal transAmount = calculateRepaymentAmount(loanId);
        
        String url = USER_MANAGEMENT_SERVICE_URL + loan.getCustomerId();
        String email = restTemplate.getForObject(url, String.class);
        
        EmailDetails emailD = new EmailDetails();
        emailD.setRecipient(email);
        emailD.setMsgBody("you just paid your EMI " + repayment.getAmount() + "your total transaction which includes your late fee and prepayment fee is " + transAmount);
        emailD.setSubject("EMI Payment");
        sendEmail(emailD);
        
        if(loan.getRepayableAmount().compareTo(BigDecimal.ZERO) == 0) {
        	transAmount=loan.getRepayableAmount();
        }
        Transaction transaction = new Transaction();
        transaction.setLoan(loan);
        transaction.setType(TransactionType.REPAYMENT);
        transaction.setAmount(transAmount);
        transactionService.recordTransaction(transaction);

        // Save repayment
        return repaymentRepository.save(repayment);
    }

    public Repayment updateRepayment(Long repaymentId, Repayment repaymentDetails) {
        Repayment repayment = repaymentRepository.findById(repaymentId)
                .orElseThrow(() -> new RuntimeException("Repayment not found with id " + repaymentId));

        repayment.setRepaymentDate(repaymentDetails.getRepaymentDate());
        repayment.setAmount(repaymentDetails.getAmount());
        repayment.setStatus(repaymentDetails.getStatus());
        
        Transaction transaction = new Transaction();
        transaction.setLoan(repayment.getLoan());
        transaction.setType(TransactionType.REPAYMENT);
        transaction.setAmount(repayment.getAmount());
        transactionService.recordTransaction(transaction);

        return repaymentRepository.save(repayment);
    }

    public void deleteRepayment(Long repaymentId) {
        Repayment repayment = repaymentRepository.findById(repaymentId)
                .orElseThrow(() -> new RuntimeException("Repayment not found with id " + repaymentId));
        

        repaymentRepository.delete(repayment);
        Transaction transaction = new Transaction();
        transaction.setLoan(repayment.getLoan());
        transaction.setType(TransactionType.FAILED);
        transaction.setAmount(repayment.getAmount());
        transactionService.recordTransaction(transaction);
    }
    
    public BigDecimal calculateRepaymentAmount(Long loanId) {
        // Fetch the loan object using the loan ID
        Loan loan = loanRepository.findByLoanId(loanId);
        if (loan == null) {
            throw new RuntimeException("Loan must not be null");
        }

        // Calculate tenure in years based on start and end date
        BigDecimal repaymentAmount=loan.getEMIAmount();

        LocalDateTime now = LocalDateTime.now();
        

        // Check if the repayment is within the first 10 days of the month
        if (now.getDayOfMonth() > 10) {
            repaymentAmount = repaymentAmount.add(loan.getLateFee());
        }

        // Check if the user has already paid this month
        List<Repayment> repayments = repaymentRepository.findByLoanId(loan.getId());
        int thisMonth = now.getMonthValue();
        int thisYear = now.getYear();
        long monthlyPayments = repayments.stream()
                                         .filter(r -> r.getRepaymentDate().getMonthValue() == thisMonth && r.getRepaymentDate().getYear() == thisYear)
                                         .count();

        // If more than one payment is made in the same month, add extra installment fee
        if (monthlyPayments > 0) {
            repaymentAmount = repaymentAmount.add(loan.getPrePaymentFee());
        }

        return repaymentAmount;
    }


    
    //new code
    public BigDecimal calculateEMI(BigDecimal amount, BigDecimal annualInterestRate, int tenureInYears) {
        MathContext mc = new MathContext(10, RoundingMode.HALF_UP);
        BigDecimal monthlyRate = annualInterestRate.divide(BigDecimal.valueOf(12 * 100), mc);
        int numPayments = tenureInYears * 12;
        BigDecimal onePlusRate = BigDecimal.ONE.add(monthlyRate, mc);
        BigDecimal denominator = onePlusRate.pow(numPayments, mc).subtract(BigDecimal.ONE, mc);
        BigDecimal emi = amount.multiply(monthlyRate, mc).multiply(onePlusRate.pow(numPayments, mc)).divide(denominator, mc);
        return emi;
    }
    
    public BigDecimal calculateEMIAmount(Long loan_id) {
        Loan loan = loanRepository.findByLoanId(loan_id);
        int tenureInYears = (int) ChronoUnit.YEARS.between(loan.getStartDate(), loan.getEndDate());
        
        BigDecimal monthlyEMI = calculateEMI(loan.getAmount(), loan.getInterestRate(), tenureInYears);
        return monthlyEMI;
    }
    

    public void sendEmail(EmailDetails emailDetails) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(emailDetails.getRecipient());
        message.setSubject(emailDetails.getSubject());
        message.setText(emailDetails.getMsgBody());
        mailSender.send(message);
    }
}