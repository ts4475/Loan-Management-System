package com.example.dto;




public class ManagersDTO {
    private long manager_id;
    private long user_id;
    private long vendor_id;
    private String assigned_customers;
	public ManagersDTO() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ManagersDTO(long manager_id, long user_id, long vendor_id, String assigned_customers) {
		super();
		this.manager_id = manager_id;
		this.user_id = user_id;
		this.vendor_id = vendor_id;
		this.assigned_customers = assigned_customers;
	}
	public long getManager_id() {
		return manager_id;
	}
	public void setManager_id(long manager_id) {
		this.manager_id = manager_id;
	}
	public long getUser_id() {
		return user_id;
	}
	public void setUser_id(long user_id) {
		this.user_id = user_id;
	}
	public long getVendor_id() {
		return vendor_id;
	}
	public void setVendor_id(long vendor_id) {
		this.vendor_id = vendor_id;
	}
	public String getAssigned_customers() {
		return assigned_customers;
	}
	public void setAssigned_customers(String assigned_customers) {
		this.assigned_customers = assigned_customers;
	}
    
    
}
