package com.stock.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "suppliers")
public class Supplier {
    @Id
    private String id;
    private String name;
    private String contact;
    private String phone;
    private String email;
    private String address;

    // Constructeur avec tous les champs
    public Supplier(String id, String name, String contact, String phone, String email, String address) {
        this.id = id;
        this.name = name;
        this.contact = contact;
        this.phone = phone;
        this.email = email;
        this.address = address;
    }

    // Constructeur par défaut (obligatoire pour Spring Data)
    public Supplier() {}

    // Getters et setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getContact() { return contact; }
    public void setContact(String contact) { this.contact = contact; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}
