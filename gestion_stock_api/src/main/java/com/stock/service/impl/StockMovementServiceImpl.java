package com.stock.service.impl;

import com.stock.model.StockMovement;
import com.stock.repository.StockMovementRepository;
import com.stock.service.StockMovementService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockMovementServiceImpl implements StockMovementService {

    private final StockMovementRepository repository;

    public StockMovementServiceImpl(StockMovementRepository repository) {
        this.repository = repository;
    }

    @Override
    public StockMovement save(StockMovement mov) {
        return repository.save(mov);
    }

    @Override
    public List<StockMovement> findAll() {
        return repository.findAll();
    }

    @Override
    public StockMovement update(String id, StockMovement updated) {
        return repository.findById(id)
                .map(m -> {
                    m.setType(updated.getType());
                    m.setQuantity(updated.getQuantity());
                    m.setProductId(updated.getProductId());
                    m.setUser(updated.getUser());
                    return repository.save(m);
                })
                .orElseThrow(() -> new RuntimeException("Mouvement non trouvé : " + id));
    }

    @Override
    public void delete(String id) {
        repository.deleteById(id);
    }
}
