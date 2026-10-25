package com.stock.service;

import com.stock.model.Product;
import java.util.List;

public interface ProductService {

    Product save(Product product);

    List<Product> findAll();

    Product update(String id, Product updatedProduct);

    void delete(String id);
}
