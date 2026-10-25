package com.stock.service;

import com.stock.model.Category;

import java.util.List;

public interface CategoryService {

    Category save(Category category);

    List<Category> findAll();

    Category update(String id, Category updatedCategory);

    void delete(String id);
}
