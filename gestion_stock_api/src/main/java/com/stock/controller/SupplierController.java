package com.stock.controller;

import com.stock.model.Supplier;
import com.stock.service.SupplierService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/suppliers")
@CrossOrigin(origins = "http://localhost:3000")
public class SupplierController {

    private final SupplierService service;

    public SupplierController(SupplierService service) {
        this.service = service;
    }

    @PostMapping
    public Supplier add(@RequestBody Supplier supplier) {
        return service.save(supplier);
    }

    @GetMapping
    public List<Supplier> getAll() {
        return service.findAll();
    }

    @PutMapping("/{id}")
    public Supplier update(@PathVariable String id, @RequestBody Supplier s) {
        return service.update(id, s);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
}
