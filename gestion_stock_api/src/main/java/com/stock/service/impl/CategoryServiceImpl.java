package com.stock.service.impl;

import com.stock.model.Category;
import com.stock.repository.CategoryRepository;
import com.stock.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository repository;

    public CategoryServiceImpl(CategoryRepository repository) {
        this.repository = repository;
    }

    @Override
    public Category save(Category category) {
        return repository.save(category);
    }

    @Override
    public List<Category> findAll() {
        return repository.findAll();
    }

    @Override
    public Category update(String id, Category updatedCategory) {
        return repository.findById(id)
                .map(cat -> {
                    cat.setName(updatedCategory.getName());
                    cat.setDescription(updatedCategory.getDescription());
                    return repository.save(cat);
                })
                .orElseThrow(() -> new RuntimeException("Category non trouvée avec id : " + id));
    }

    @Override
    public void delete(String id) {
        repository.deleteById(id);
    }
}
