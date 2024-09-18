package com.example.dto;

public class EmaildetailsDTO {
	private long id;
    private String recipient;
    private String subject;
    private String msgBody;
	public EmaildetailsDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public EmaildetailsDTO(long id, String recipient, String subject, String msgBody) {
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

