package com.stock.service.impl;

import com.stock.model.Supplier;
import com.stock.repository.SupplierRepository;
import com.stock.service.SupplierService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository repository;

    public SupplierServiceImpl(SupplierRepository repository) {
        this.repository = repository;
    }

    @Override
    public Supplier save(Supplier supplier) {
        return repository.save(supplier);
    }

    @Override
    public List<Supplier> findAll() {
        return repository.findAll();
    }

    @Override
    public Supplier update(String id, Supplier updated) {
        return repository.findById(id)
                .map(s -> {
                    s.setName(updated.getName());
                    s.setEmail(updated.getEmail());
                    s.setPhone(updated.getPhone());
                    return repository.save(s);
                })
                .orElseThrow(() -> new RuntimeException("Fournisseur non trouvé : " + id));
    }

    @Override
    public void delete(String id) {
        repository.deleteById(id);
    }
}
