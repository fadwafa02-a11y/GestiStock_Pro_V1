package com.stock.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "stocks_movements")
public class StockMovement {
    @Id
    private String id;
    private String productId;
    private String type; // "in" ou "out"
    private int quantity;
    private String date;
    private String reason;
    private String user;

    // Constructeur avec tous les champs
    public StockMovement(String id, String productId, String type, int quantity,
                         String date, String reason, String user) {
        this.id = id;
        this.productId = productId;
        this.type = type;
        this.quantity = quantity;
        this.date = date;
        this.reason = reason;
        this.user = user;
    }

    // Constructeur par défaut
    public StockMovement() {}

    // Getters et setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getUser() { return user; }
    public void setUser(String user) { this.user = user; }
}
