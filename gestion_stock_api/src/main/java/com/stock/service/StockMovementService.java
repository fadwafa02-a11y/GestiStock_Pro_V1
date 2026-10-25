package com.stock.service;

import com.stock.model.StockMovement;
import java.util.List;

public interface StockMovementService {

    StockMovement save(StockMovement mov);

    List<StockMovement> findAll();

    StockMovement update(String id, StockMovement updated);

    void delete(String id);
}
