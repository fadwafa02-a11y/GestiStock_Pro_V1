package com.stock.repository;

import com.stock.model.StockMovement;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StockMovementRepository extends MongoRepository<StockMovement, String> {
}
