package com.stock.controller;

import com.stock.model.Product;
import com.stock.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @PostMapping
    public Product add(@RequestBody Product product) {
        return service.save(product);
    }

    @GetMapping
    public List<Product> getAll() {
        return service.findAll();
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable String id, @RequestBody Product p) {
        return service.update(id, p);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
}
