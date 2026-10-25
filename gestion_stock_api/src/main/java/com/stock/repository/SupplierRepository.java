package com.stock.repository;

import com.stock.model.Supplier;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SupplierRepository extends MongoRepository<Supplier, String> {
}
