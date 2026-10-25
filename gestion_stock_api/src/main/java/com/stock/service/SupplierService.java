package com.stock.service;

import com.stock.model.Supplier;
import java.util.List;

public interface SupplierService {

    Supplier save(Supplier supplier);

    List<Supplier> findAll();

    Supplier update(String id, Supplier updated);

    void delete(String id);
}
