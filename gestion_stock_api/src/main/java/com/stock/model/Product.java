package com.stock.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "products")
public class Product {
    @Id
    private String id;
    private String name;
    private String description;
    private String categoryId;
    private String supplierId;
    private double price;
    private int quantity;
    private int minQuantity;
    private String createdAt;
    private String updatedAt;

    // Constructeur avec tous les champs
    public Product(String id, String name, String description, String categoryId, String supplierId,
                   double price, int quantity, int minQuantity, String createdAt, String updatedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.categoryId = categoryId;
        this.supplierId = supplierId;
        this.price = price;
        this.quantity = quantity;
        this.minQuantity = minQuantity;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Constructeur par défaut
    public Product() {}

    // Getters et setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategoryId() { return categoryId; }
    public void setCategoryId(String categoryId) { this.categoryId = categoryId; }

    public String getSupplierId() { return supplierId; }
    public void setSupplierId(String supplierId) { this.supplierId = supplierId; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public int getMinQuantity() { return minQuantity; }
    public void setMinQuantity(int minQuantity) { this.minQuantity = minQuantity; }

    public String getCreatedAt() { return createdAt; }
    public void setCreatedAt(String createdAt) { this.createdAt = createdAt; }

    public String getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(String updatedAt) { this.updatedAt = updatedAt; }
}
