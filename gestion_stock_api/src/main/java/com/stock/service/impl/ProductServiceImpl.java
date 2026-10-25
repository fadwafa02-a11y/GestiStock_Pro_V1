package com.stock.service.impl;

import com.stock.model.Product;
import com.stock.repository.ProductRepository;
import com.stock.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repository;

    public ProductServiceImpl(ProductRepository repository) {
        this.repository = repository;
    }

    @Override
    public Product save(Product product) {
        return repository.save(product);
    }

    @Override
    public List<Product> findAll() {
        return repository.findAll();
    }

    @Override
    public Product update(String id, Product updatedProduct) {
        return repository.findById(id)
                .map(p -> {
                    p.setName(updatedProduct.getName());
                    p.setPrice(updatedProduct.getPrice());
                    p.setQuantity(updatedProduct.getQuantity());
                    p.setCategoryId(updatedProduct.getCategoryId());
                    p.setSupplierId(updatedProduct.getSupplierId());
                    return repository.save(p);
                })
                .orElseThrow(() -> new RuntimeException("Produit non trouvé : " + id));
    }

    @Override
    public void delete(String id) {
        repository.deleteById(id);
    }
}
