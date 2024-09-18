package com.example.model;





import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class EmailDetails {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
    private String recipient;
    private String subject;
    private String msgBody;
	public EmailDetails() {
		super();
		// TODO Auto-generated constructor stub
	}
	public EmailDetails(long id, String recipient, String subject, String msgBody) {
		super();
		this.id = id;
		this.recipient = recipient;
		this.subject = subject;
		this.msgBody = msgBody;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getRecipient() {
		return recipient;
	}
	public void setRecipient(String recipient) {
		this.recipient = recipient;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getMsgBody() {
		return msgBody;
	}
	public void setMsgBody(String msgBody) {
		this.msgBody = msgBody;
	}
    

}
