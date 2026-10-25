package com.stock.controller;

import com.stock.model.StockMovement;
import com.stock.service.StockMovementService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stock-movements")
@CrossOrigin(origins = "http://localhost:3000")
public class StockMovementController {

    private final StockMovementService service;

    public StockMovementController(StockMovementService service) {
        this.service = service;
    }

    @PostMapping
    public StockMovement add(@RequestBody StockMovement mov) {
        return service.save(mov);
    }

    @GetMapping
    public List<StockMovement> getAll() {
        return service.findAll();
    }

    @PutMapping("/{id}")
    public StockMovement update(@PathVariable String id, @RequestBody StockMovement mov) {
        return service.update(id, mov);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
}
