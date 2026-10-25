package com.stock.controller;

import com.stock.model.Category;
import com.stock.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {

    private final CategoryService service;

    public CategoryController(CategoryService service) {
        this.service = service;
    }

    @PostMapping
    public Category addCategory(@RequestBody Category category) {
        return service.save(category);
    }

    @GetMapping
    public List<Category> getAllCategories() {
        return service.findAll();
    }

    @PutMapping("/{id}")
    public Category updateCategory(@PathVariable String id, @RequestBody Category updatedCategory) {
        return service.update(id, updatedCategory);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable String id) {
        service.delete(id);
    }
}
